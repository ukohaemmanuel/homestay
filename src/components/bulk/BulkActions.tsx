import React from 'react';
import { Loader, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BulkActionsProps<T> {
  selectedItems: T[];
  actions: {
    label: string;
    icon?: React.ReactNode;
    handler: (items: T[]) => Promise<void>;
  }[];
  onComplete?: () => void;
}

export default function BulkActions<T>({
  selectedItems,
  actions,
  onComplete,
}: BulkActionsProps<T>) {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [results, setResults] = React.useState<{
    success: number;
    failed: number;
  }>({ success: 0, failed: 0 });

  const handleAction = async (handler: (items: T[]) => Promise<void>) => {
    setIsProcessing(true);
    let success = 0;
    let failed = 0;

    try {
      await handler(selectedItems);
      success = selectedItems.length;
    } catch (error) {
      failed = selectedItems.length;
    }

    setResults({ success, failed });
    setIsProcessing(false);
    onComplete?.();
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center space-x-4">
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <Loader className="h-5 w-5 animate-spin" />
            <span>{t('processing')}</span>
          </div>
        ) : results.success > 0 || results.failed > 0 ? (
          <div className="flex items-center space-x-4">
            {results.success > 0 && (
              <div className="flex items-center text-green-600">
                <Check className="h-5 w-5 mr-1" />
                <span>{results.success} {t('successful')}</span>
              </div>
            )}
            {results.failed > 0 && (
              <div className="flex items-center text-red-600">
                <X className="h-5 w-5 mr-1" />
                <span>{results.failed} {t('failed')}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span>{selectedItems.length} {t('itemsSelected')}</span>
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleAction(action.handler)}
                className="btn"
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}