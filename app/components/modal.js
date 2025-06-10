'use client'; // This component will be rendered on the client side.
import React, { useEffect, useRef } from 'react';
// The Modal component.
// isOpen: Boolean to control visibility of the modal.
// onClose: Function to call when the modal needs to be closed (e.g., clicking outside or a close button).
// children: The content to be displayed inside the modal.
export const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(); // Ref to the modal content area for click outside detection.
  // Effect to handle clicking outside the modal to close it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the modal is open and the click is outside the modal content, close it.
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    // Add event listener when modal is open.
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    // Clean up the event listener when component unmounts or modal closes.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]); // Re-run effect if isOpen or onClose changes.
  // If the modal is not open, don't render anything.
  if (!isOpen) {
    return null;
  }
  return (
    // Overlay: Fixed position, fills screen, semi-transparent background.
    // Z-index ensures it's on top of other content.
    <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50">
      {/* Modal content container: centered, with a ref for outside clicks */}
      <div
        ref={modalRef}
        className="bg-white border rounded-4xl shadow-2xl p-6  transform transition-all duration-300 ease-in-out scale-100 opacity-100
                   sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl" // Responsive max-width
      >
        {/* Render children passed to the Modal */}
        {children}
      </div>
    </div>
  );
};

