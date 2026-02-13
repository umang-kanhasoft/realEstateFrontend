'use client';

import PropertyChatbot from '@/components/common/PropertyChatbot';
import { useUI } from '@/hooks/useUI';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function PropertiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { state: uiState, closeFilterDrawer } = useUI();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50 font-sans">
      {/* Left Panel - Fixed Chat (Desktop) */}
      <div className="hidden w-[350px] shrink-0 flex-col border-r border-gray-200 bg-white lg:flex xl:w-[400px]">
        <div className="h-full w-full p-4">
          <PropertyChatbot />
        </div>
      </div>

      {/* Right Panel - Scrollable Content */}
      <div className="scrollbar-hide flex-1 overflow-y-auto">{children}</div>

      {/* Mobile Chat Dialog Overlay */}
      <AnimatePresence>
        {uiState.isFilterDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFilterDrawer}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />
            {/* Dialog Container */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.1,
                x: '40%',
                y: -40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.1,
                x: '40%',
                y: -40,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              className="fixed bottom-32 left-4 right-4 top-20 z-50 flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl lg:hidden"
              style={{ transformOrigin: 'top right' }}
            >
              {/* Chat Content */}
              <Box className="flex-1 overflow-hidden bg-gray-50/50">
                <PropertyChatbot />
              </Box>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
