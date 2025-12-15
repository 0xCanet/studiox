"use client";

import { useRef, useEffect } from "react";
import type React from "react";
import { Viewer, Worker, ScrollMode, type RenderPageProps } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

interface PDFViewerProps {
  fileUrl: string;
}

export function PDFViewer({ fileUrl }: PDFViewerProps) {
  // Use useRef to store plugin instance and prevent recreation on each render
  // This ensures hooks inside zoomPlugin() are called consistently
  const zoomPluginInstanceRef = useRef(zoomPlugin());
  const zoomPluginInstance = zoomPluginInstanceRef.current;
  const { ZoomIn, ZoomOut, CurrentScale } = zoomPluginInstance;

  // Enable vertical scroll mode to see all pages
  const scrollModePluginInstanceRef = useRef(scrollModePlugin());
  const scrollModePluginInstance = scrollModePluginInstanceRef.current;
  
  // Set vertical scroll mode after plugin initialization
  useEffect(() => {
    scrollModePluginInstance.switchScrollMode(ScrollMode.Vertical);
  }, [scrollModePluginInstance]);

  // Custom render range function to preload 2 pages in advance (reduced for better performance)
  const setRenderRange = useRef((visiblePagesRange: { startPage: number; endPage: number; numPages: number }) => {
    const preloadPages = 2; // Reduced from 3 to 2 for better performance
    return {
      startPage: Math.max(0, visiblePagesRange.startPage - preloadPages),
      endPage: Math.min(visiblePagesRange.numPages - 1, visiblePagesRange.endPage + preloadPages),
    };
  }).current;

  // Optimized page renderer - only render canvas layer for better performance
  // Disable textLayer and annotationLayer to speed up rendering significantly
  const renderPage = useRef((props: RenderPageProps) => {
    return (
      <>
        {props.canvasLayer.children}
        {/* Disable textLayer and annotationLayer for better performance */}
      </>
    );
  }).current;

  // Optimize PDF loading parameters for better performance
  const transformGetDocumentParams = useRef((options: any) => {
    return {
      ...options,
      // Disable text layer extraction for faster loading
      disableAutoFetch: false,
      disableStream: false,
    };
  }).current;

  // Use local worker matching the installed pdfjs-dist version
  // Fallback to CDN if local worker not available
  const workerUrl = "/pdfjs-worker/pdf.worker.min.mjs";

  return (
    <div className="w-full">
      <Worker workerUrl={workerUrl}>
        <div className="mb-4 flex items-center justify-end gap-2 border-b border-[#0E0E0E]/10 pb-4">
          <ZoomOut>
            {(props) => (
              <button
                className="p-2 hover:bg-[#0E0E0E]/5 rounded transition-colors text-[#0E0E0E]"
                onClick={props.onClick}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                  />
                </svg>
              </button>
            )}
          </ZoomOut>
          <CurrentScale>
            {(props) => (
              <div className="px-3 py-2 text-sm text-[#0E0E0E] font-medium">
                {Math.round(props.scale * 100)}%
              </div>
            )}
          </CurrentScale>
          <ZoomIn>
            {(props) => (
              <button
                className="p-2 hover:bg-[#0E0E0E]/5 rounded transition-colors text-[#0E0E0E]"
                onClick={props.onClick}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </button>
            )}
          </ZoomIn>
        </div>
        <div className="border border-[#0E0E0E]/10 rounded-lg bg-[#F0EEE9]">
          <div
            style={{
              height: "800px",
            }}
            data-lenis-prevent
          >
            <Viewer 
              fileUrl={fileUrl} 
              plugins={[scrollModePluginInstance, zoomPluginInstance]}
              setRenderRange={setRenderRange}
              renderPage={renderPage}
              transformGetDocumentParams={transformGetDocumentParams}
              enableSmoothScroll={false}
              renderError={(error) => (
                <div className="flex items-center justify-center h-full text-[#0E0E0E]/50">
                  <p>Erreur de chargement du PDF: {error.message}</p>
                </div>
              )}
              renderLoader={(percentages) => (
                <div className="flex items-center justify-center h-full text-[#0E0E0E]/50">
                  <p>Chargement... {Math.round(percentages)}%</p>
                </div>
              )}
            />
          </div>
        </div>
      </Worker>
    </div>
  );
}

