"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Dialog, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { InquiryForm } from "./InquiryForm";
import type { ConsultationService } from "@/lib/inquiry";
import styles from "./InquiryModal.module.css";

const InquiryModalContext = createContext<((service?: ConsultationService) => void) | null>(null);

export function InquiryModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectedService, setSelectedService] = useState<ConsultationService | undefined>();
  const [formInstance, setFormInstance] = useState(0);
  const close = () => {
    if (!busy) setOpen(false);
  };

  return (
    <InquiryModalContext.Provider
      value={(service) => {
        setSelectedService(service);
        setFormInstance((instance) => instance + 1);
        setOpen(true);
      }}
    >
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
        <InquiryForm key={formInstance} onBusyChange={setBusy} selectedService={selectedService} />
      </Dialog>
    </InquiryModalContext.Provider>
  );
}

export function InquiryTrigger({
  children,
  className,
  service,
}: Readonly<{ children: ReactNode; className?: string; service?: ConsultationService }>) {
  const openInquiry = useContext(InquiryModalContext);
  if (!openInquiry) throw new Error("InquiryTrigger must be used within InquiryModalProvider.");
  return (
    <button type="button" className={className} onClick={() => openInquiry(service)}>
      {children}
    </button>
  );
}
