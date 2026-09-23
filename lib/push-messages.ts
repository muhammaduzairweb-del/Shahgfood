// 12 daily notification slots (Asia/Karachi hours), shared by the in-page
// reminder scheduler (client) and the Web Push sender (/api/push/send).

export const SLOTS = [9, 10, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22];

export interface PushMessage {
  title: string;
  body: string;
}

export const MESSAGES: Record<number, PushMessage> = {
  9: { title: "Breakfast time", body: "Aloo paratha, omelette and a hot cup of doodh patti. Start your day with a desi breakfast from Shah G Foods." },
  10: { title: "Chai break?", body: "Kashmiri chai or doodh patti, freshly brewed at your nearest Shah G Foods branch." },
  12: { title: "Lunch is calling", body: "Our famous Daal Chawal is ready. Order by call or WhatsApp in one tap." },
  13: { title: "Craving karahi?", body: "Chicken, mutton or BBQ chicken karahi, cooked fresh when you order. Best with hot naan." },
  15: { title: "Afternoon snack", body: "Samosa chaat, dahi bhallay and golgappay. The perfect 3 PM pick-me-up." },
  16: { title: "Something cold?", body: "Thick mango shakes, fresh juices and lassi to beat the afternoon heat." },
  17: { title: "Biryani o'clock", body: "Chicken biryani and Bannu beef pulao, fresh from the Shah G Foods kitchen." },
  18: { title: "BBQ is on the grill", body: "Chicken tikka, seekh kebab and malai boti. Order early and skip the dinner rush." },
  19: { title: "Planning dinner?", body: "92 dishes on the menu, from biryani and karahi to BBQ platters. Browse now and order in one tap." },
  20: { title: "Dinner time", body: "Hot, fresh desi food delivered across Islamabad and Rawalpindi. Call or WhatsApp to order." },
  21: { title: "Room for dessert?", body: "Warm gulab jamun and creamy kheer, the proper way to end a desi dinner." },
  22: { title: "Late-night hunger?", body: "We are open until 2 AM. Paratha rolls, fries and chai for the night owls." },
};

export function messageFor(hour: number): PushMessage {
  return MESSAGES[hour] || MESSAGES[20];
}
