export type NotificationEmail = {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

export async function emailAccepted(
  send: (message: NotificationEmail) => Promise<{ data: { id: string } | null; error: unknown }>,
  message: NotificationEmail,
): Promise<boolean> {
  try {
    const result = await send(message);
    return Boolean(result.data?.id) && !result.error;
  } catch {
    return false;
  }
}
