'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PageTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Track page view
        const trackView = async () => {
            try {
                await fetch('/api/public/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: pathname }),
                });
            } catch (error) {
                // Silently fail - tracking should not break the page
                console.debug('Tracking failed:', error);
            }
        };

        trackView();
    }, [pathname]);

    return null; // This component doesn't render anything
}
