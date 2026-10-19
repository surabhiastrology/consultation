"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Dialog, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { InquiryForm } from "./InquiryForm";
import styles from "./InquiryModal.module.css";

const InquiryModalContext = createContext<(() => void) | null>(null);

export function InquiryModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const close = () => {
    if (!busy) setOpen(false);
  };

  return (
    <InquiryModalContext.Provider value={() => setOpen(true)}>
      {children}
      <Dialog
        open={open}
        onClose={close}
        fullWidth
        maxWidth="md"
        scroll="paper"
        aria-labelledby="inquiry-dialog-title"
        slotProps={{ paper: { className: styles.paper } }}
      >
        <div className={styles.header}>
          <IconButton
            aria-label="Close inquiry"
            onClick={close}
            disabled={busy}
            className={styles.close}
          >
            <X size={22} strokeWidth={1.7} />
          </IconButton>
          <h2 id="inquiry-dialog-title">Your question deserves time.</h2>
        </div>
        <InquiryForm onBusyChange={setBusy} />
      </Dialog>
    </InquiryModalContext.Provider>
  );
}

export function InquiryTrigger({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  const openInquiry = useContext(InquiryModalContext);
  if (!openInquiry) throw new Error("InquiryTrigger must be used within InquiryModalProvider.");
  return (
    <button type="button" className={className} onClick={openInquiry}>
      {children}
    </button>
  );
}
