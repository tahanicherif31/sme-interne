export type Event = {
  id: string;
  title: string;
  image: string;
  location: string;
  start_date: string;
  end_date: string;
  button: string;
  button_name: string;
  description: string;
  tags: string[];
  partnership: Record<string, string>;
};

export type EventType = "past" | "upcoming";

export type EventRegistration = {
  eventId: string;
  companyId: string;
  id: string;
  userId: string;
  registeredAt: string;
};
