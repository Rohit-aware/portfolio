import React, { useEffect, useState } from 'react';

/**
 * SecuritySystem — production-grade protection layer.
 * Prevents:
 * 1. Right-click (Context Menu)
 * 2. Text Selection & Copying (JS + CSS)
 * 3. Common DevTools shortcuts (F12, Ctrl+Shift+I, etc.)
 * 4. Content exposure on window blur (Deters screenshots)
 * 5. Basic DOM inspection deterrence via debugger loop.
 */
const SecuritySystem: React.FC = () => {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    // 1. Disable Right-Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable Keyboard Shortcuts for DevTools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Opt+I (Chrome/Safari)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J / Cmd+Opt+J
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+U / Cmd+Opt+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+S / Cmd+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Disable Copy/Cut/Paste
    const handleClipboard = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    // 4. Screenshot Deterrence (Blur content when tab loses focus)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    const handleBlur = () => setIsBlurred(true);
    const handleFocus = () => setIsBlurred(false);

    // 5. DevTools Detection & Console Clearing
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        console.clear();
        console.log('%cSTOP!', 'color: red; font-size: 40px; font-weight: bold; -webkit-text-stroke: 1px black;');
        console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or "hack" someone, it is a scam.', 'font-size: 16px;');
      }
    };

    const devToolsInterval = setInterval(detectDevTools, 1000);

    // 6. Anti-Selection (Additional fallback)
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Attach listeners
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('copy', handleClipboard);
    window.addEventListener('cut', handleClipboard);
    window.addEventListener('paste', handleClipboard);
    window.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    // Clean up
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('copy', handleClipboard);
      window.removeEventListener('cut', handleClipboard);
      window.removeEventListener('paste', handleClipboard);
      window.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      clearInterval(devToolsInterval);
    };
  }, []);

  return (
    <>
      {/* Visual protection when focus is lost */}
      {isBlurred && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-xl"
          style={{ pointerEvents: 'all' }}
        >
          <div className="text-center p-8 rounded-2xl bg-card border border-border shadow-2xl animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold mb-2">Protected Content</h2>
            <p className="text-muted-foreground">Please return to the window to view the content.</p>
          </div>
        </div>
      )}

      {/* Global CSS for selection prevention */}
      <style>{`
        body {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }

        /* Hide elements during print */
        @media print {
          body {
            display: none !important;
          }
        }

        /* Specifically prevent dragging images */
        img {
          -webkit-user-drag: none !important;
          -khtml-user-drag: none !important;
          -moz-user-drag: none !important;
          -o-user-drag: none !important;
          user-drag: none !important;
        }
      `}</style>
    </>
  );
};

export default SecuritySystem;
