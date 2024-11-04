import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Image, Upload, Palette, Type } from 'lucide-react';
import { adminApi } from '../../lib/api/admin';
import { useFileUpload } from '../../hooks/useFileUpload';

const brandingSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteTitle: z.string().min(1, 'Site title is required'),
  metaDescription: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  faviconUrl: z.string().optional(),
  logoUrl: z.string().optional(),
  darkModeLogo: z.string().optional(),
});

type BrandingForm = z.infer<typeof brandingSchema>;

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/x-icon'];

export default function BrandingConfig() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<BrandingForm>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [previewLogo, setPreviewLogo] = React.useState<string | null>(null);
  const [previewDarkLogo, setPreviewDarkLogo] = React.useState<string | null>(null);
  const [previewFavicon, setPreviewFavicon] = React.useState<string | null>(null);

  const { files: logoFiles, handleFiles: handleLogoFiles } = useFileUpload({
    maxFiles: 1,
    acceptedTypes: ACCEPTED_IMAGE_TYPES,
    maxSize: 2 * 1024 * 1024, // 2MB
  });

  const { files: darkLogoFiles, handleFiles: handleDarkLogoFiles } = useFileUpload({
    maxFiles: 1,
    acceptedTypes: ACCEPTED_IMAGE_TYPES,
    maxSize: 2 * 1024 * 1024,
  });

  const { files: faviconFiles, handleFiles: handleFaviconFiles } = useFileUpload({
    maxFiles: 1,
    acceptedTypes: [...ACCEPTED_IMAGE_TYPES, 'image/x-icon'],
    maxSize: 1 * 1024 * 1024, // 1MB
  });

  const onSubmit = async (data: BrandingForm) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Append form data
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      // Append files
      if (logoFiles[0]) formData.append('logo', logoFiles[0]);
      if (darkLogoFiles[0]) formData.append('darkModeLogo', darkLogoFiles[0]);
      if (faviconFiles[0]) formData.append('favicon', faviconFiles[0]);

      await adminApi.updateBranding(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update branding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilePreview = (file: File, setPreview: (url: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (logoFiles[0]) handleFilePreview(logoFiles[0], setPreviewLogo);
    if (darkLogoFiles[0]) handleFilePreview(darkLogoFiles[0], setPreviewDarkLogo);
    if (faviconFiles[0]) handleFilePreview(faviconFiles[0], setPreviewFavicon);
  }, [logoFiles, darkLogoFiles, faviconFiles]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Branding Configuration</h1>
        <p className="mt-1 text-sm text-gray-500">
          Customize your workshop management system's appearance
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
          Branding settings updated successfully
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Type className="h-6 w-6 text-brand-600 mr-2" />
            <h2 className="text-lg font-medium">Site Information</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Site Name</label>
              <input
                {...register('siteName')}
                className="input"
                placeholder="Workshop Manager"
              />
              {errors.siteName && (
                <p className="error">{errors.siteName.message}</p>
              )}
            </div>

            <div>
              <label className="label">Site Title</label>
              <input
                {...register('siteTitle')}
                className="input"
                placeholder="Workshop Management System"
              />
              {errors.siteTitle && (
                <p className="error">{errors.siteTitle.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="label">Meta Description</label>
              <textarea
                {...register('metaDescription')}
                className="input"
                rows={3}
                placeholder="Comprehensive workshop management solution..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Palette className="h-6 w-6 text-brand-600 mr-2" />
            <h2 className="text-lg font-medium">Color Scheme</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Primary Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  {...register('primaryColor')}
                  className="h-10 w-10"
                />
                <input
                  type="text"
                  {...register('primaryColor')}
                  className="input flex-1"
                  placeholder="#0284C7"
                />
              </div>
            </div>

            <div>
              <label className="label">Secondary Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  {...register('secondaryColor')}
                  className="h-10 w-10"
                />
                <input
                  type="text"
                  {...register('secondaryColor')}
                  className="input flex-1"
                  placeholder="#1E293B"
                />
              </div>
            </div>

            <div>
              <label className="label">Accent Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  {...register('accentColor')}
                  className="h-10 w-10"
                />
                <input
                  type="text"
                  {...register('accentColor')}
                  className="input flex-1"
                  placeholder="#22C55E"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Image className="h-6 w-6 text-brand-600 mr-2" />
            <h2 className="text-lg font-medium">Logo & Favicon</h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="label">Logo (Light Mode)</label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {previewLogo ? (
                  <div className="space-y-2">
                    <img
                      src={previewLogo}
                      alt="Logo preview"
                      className="max-h-32 mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewLogo(null)}
                      className="text-sm text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept={ACCEPTED_IMAGE_TYPES.join(',')}
                          onChange={(e) => handleLogoFiles(e.target.files || [])}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, SVG up to 2MB</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="label">Logo (Dark Mode)</label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {previewDarkLogo ? (
                  <div className="space-y-2">
                    <img
                      src={previewDarkLogo}
                      alt="Dark logo preview"
                      className="max-h-32 mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewDarkLogo(null)}
                      className="text-sm text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept={ACCEPTED_IMAGE_TYPES.join(',')}
                          onChange={(e) => handleDarkLogoFiles(e.target.files || [])}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, SVG up to 2MB</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="label">Favicon</label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {previewFavicon ? (
                  <div className="space-y-2">
                    <img
                      src={previewFavicon}
                      alt="Favicon preview"
                      className="max-h-32 mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewFavicon(null)}
                      className="text-sm text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept={[...ACCEPTED_IMAGE_TYPES, 'image/x-icon'].join(',')}
                          onChange={(e) => handleFaviconFiles(e.target.files || [])}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">ICO, PNG, SVG up to 1MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="btn"
          >
            {isLoading ? 'Saving...' : 'Save Branding Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}