import React from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Settings } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Widget {
  id: string;
  title: string;
  component: React.ReactNode;
  size: 'small' | 'medium' | 'large';
}

interface CustomDashboardProps {
  availableWidgets: Widget[];
}

export default function CustomDashboard({ availableWidgets }: CustomDashboardProps) {
  const { t } = useTranslation();
  const [widgets, setWidgets] = useLocalStorage<string[]>('dashboard-widgets', 
    availableWidgets.map(w => w.id)
  );
  const [isEditing, setIsEditing] = React.useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWidgets(items);
  };

  const toggleWidget = (widgetId: string) => {
    if (widgets.includes(widgetId)) {
      setWidgets(widgets.filter(id => id !== widgetId));
    } else {
      setWidgets([...widgets, widgetId]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">{t('dashboard.customDashboard')}</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-secondary"
        >
          <Settings className="h-4 w-4 mr-2" />
          {t('dashboard.customize')}
        </button>
      </div>

      {isEditing && (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h3 className="text-sm font-medium mb-2">{t('dashboard.availableWidgets')}</h3>
          <div className="flex flex-wrap gap-2">
            {availableWidgets.map(widget => (
              <label key={widget.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={widgets.includes(widget.id)}
                  onChange={() => toggleWidget(widget.id)}
                  className="rounded border-gray-300"
                />
                <span>{widget.title}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {widgets.map((widgetId, index) => {
                const widget = availableWidgets.find(w => w.id === widgetId);
                if (!widget) return null;

                return (
                  <Draggable
                    key={widget.id}
                    draggableId={widget.id}
                    index={index}
                    isDragDisabled={!isEditing}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-white rounded-lg shadow p-4 ${
                          widget.size === 'large' ? 'col-span-2' :
                          widget.size === 'medium' ? 'col-span-1' :
                          'col-span-1'
                        }`}
                      >
                        <h3 className="text-lg font-medium mb-4">{widget.title}</h3>
                        {widget.component}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}