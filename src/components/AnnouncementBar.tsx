
import { useState } from 'react';
import { X, Clock } from 'lucide-react';

export const AnnouncementBar = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-primary px-4 py-2 text-primary-foreground relative z-50">
            <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-medium text-center pr-8">
                <Clock className="w-4 h-4 inline-block" />
                <p>
                    Note: All custom orders require <span className="font-bold underline">24-48 hours</span> prior notice for baking and preparation.
                </p>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
                aria-label="Dismiss announcement"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
