// 12 daily notification slots (Asia/Karachi hours) — shared by the in-page
// reminder scheduler (client) and the Web Push sender (/api/push/send).

export const SLOTS = [9, 10, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22];

export interface PushMessage {
  title: string;
  body: string;
}

export const MESSAGES: Record<number, { en: PushMessage; ur: PushMessage }> = {
  9: {
    en: { title: "Nashta time!", body: "Halwa puri, anda paratha, channay — order a proper desi breakfast directly from Shah G Foods on shahgfood.com." },
    ur: { title: "ناشتے کا وقت!", body: "حلوہ پوری، انڈا پراٹھا، چنے — شاہ جی فوڈز سے براہِ راست دیسی ناشتہ آرڈر کریں۔" },
  },
  10: {
    en: { title: "Own a restaurant?", body: "List your menu on Shah G Online — 10,000+ daily visitors, 0% commission, orders straight to your number." },
    ur: { title: "ریستوران کے مالک ہیں؟", body: "اپنا مینو شاہ جی آن لائن پر لسٹ کریں — روزانہ 10,000+ وزیٹرز، صفر کمیشن، آرڈرز سیدھے آپ کے نمبر پر۔" },
  },
  12: {
    en: { title: "Lunch o'clock", body: "The legendary Daal Chawal is calling. Browse the full menu and order by call or WhatsApp in one tap." },
    ur: { title: "دوپہر کے کھانے کا وقت", body: "مشہورِ زمانہ دال چاول آپ کو بلا رہے ہیں۔ مکمل مینو دیکھیں اور ایک ٹیپ میں آرڈر کریں۔" },
  },
  13: {
    en: { title: "Karahi craving?", body: "Chicken karahi, handi, Bannu pulao — fresh from the best kitchens in your area. Order direct, no middle-man." },
    ur: { title: "کڑاہی کی طلب؟", body: "چکن کڑاہی، ہانڈی، بنوں پلاؤ — آپ کے علاقے کے بہترین کچن سے تازہ۔ سیدھا آرڈر کریں۔" },
  },
  15: {
    en: { title: "Chai break", body: "Chaat, samosa chaat and doodh-patti — the perfect 3 PM combo is one call away." },
    ur: { title: "چائے کا وقفہ", body: "چاٹ، سموسہ چاٹ اور دودھ پتی — تین بجے کا بہترین کومبو صرف ایک کال کی دوری پر۔" },
  },
  16: {
    en: { title: "Something cold?", body: "Thick mango shakes, fresh juices and lassi — beat the afternoon slump with something chilled." },
    ur: { title: "کچھ ٹھنڈا ہو جائے؟", body: "گاڑھے مینگو شیک، تازہ جوس اور لسی — دوپہر کی سستی کا بہترین علاج۔" },
  },
  17: {
    en: { title: "New kitchens are joining", body: "Shah G Online is growing across Pakistan. Restaurant owners: get listed today and go live within 24 hours." },
    ur: { title: "نئے کچن شامل ہو رہے ہیں", body: "شاہ جی آن لائن پورے پاکستان میں بڑھ رہا ہے۔ ریستوران مالکان: آج لسٹ ہوں، 24 گھنٹے میں لائیو۔" },
  },
  18: {
    en: { title: "BBQ hour approaches", body: "Charcoal tikka, seekh kebab, malai boti — order early and skip the dinner rush." },
    ur: { title: "باربی کیو کا وقت قریب ہے", body: "کوئلوں کا تکہ، سیخ کباب، ملائی بوٹی — جلدی آرڈر کریں اور رش سے بچیں۔" },
  },
  19: {
    en: { title: "Planning dinner?", body: "92 dishes on the menu — biryani, karahi, BBQ platters and more. Browse now, order in one tap." },
    ur: { title: "رات کے کھانے کا سوچ رہے ہیں؟", body: "مینو پر 92 ڈشز — بریانی، کڑاہی، باربی کیو پلیٹرز اور بہت کچھ۔ ابھی دیکھیں، ایک ٹیپ میں آرڈر کریں۔" },
  },
  20: {
    en: { title: "Dinner o'clock", body: "Hot, fresh and desi — order directly from the kitchen by call or WhatsApp. Family-size deals available." },
    ur: { title: "کھانے کا وقت", body: "گرم، تازہ اور دیسی — کچن سے سیدھا کال یا واٹس ایپ پر آرڈر کریں۔ فیملی سائز ڈیلز موجود۔" },
  },
  21: {
    en: { title: "Room for dessert?", body: "Warm gulab jamun and creamy kheer — the proper way to end a desi dinner." },
    ur: { title: "میٹھے کی گنجائش ہے؟", body: "گرم گلاب جامن اور کریمی کھیر — دیسی کھانے کا اصل اختتام۔" },
  },
  22: {
    en: { title: "Late-night bite", body: "Kitchens are open till 2 AM — paratha rolls, fries and chai for the night owls." },
    ur: { title: "رات گئے کی بھوک", body: "کچن رات 2 بجے تک کھلے ہیں — پراٹھا رول، فرائز اور چائے رات جاگنے والوں کے لیے۔" },
  },
};

export function messageFor(hour: number, ur: boolean): PushMessage {
  const m = MESSAGES[hour] || MESSAGES[20];
  return ur ? m.ur : m.en;
}
