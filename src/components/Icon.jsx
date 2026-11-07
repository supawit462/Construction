// ไอคอนเส้น (stroke) ใช้ทั่วทั้งเว็บ
const PATHS = {
  home: <><path d="M3 11 12 4l9 7v9H3z" /><path d="M9 20v-6h6v6" /></>,
  star: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  phone: <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />,
  chat: <><path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.3S17 3 12 3Z" /><path d="m7.5 13.5 3-3 2 2 3-3" /></>,
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8" />,
  tropical: <><path d="M12 21V11" /><path d="M12 11C8 11 5 8.5 4 5c4 0 7 2 8 6Z" /><path d="M12 11c4 0 7-2.5 8-6-4 0-7 2-8 6Z" /><path d="M12 15c-2.5 0-4.5-1.5-5-4" /></>,
  wood: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="3" /><path d="M12 3v3" /></>,
  contemporary: <><rect x="3" y="10" width="18" height="11" /><rect x="7" y="4" width="10" height="6" /><path d="M7 14h4v7M14 14h4v3h-4z" /></>,
  family: <><path d="M3 11 12 4l9 7v10H3z" /><path d="M12 18s-3.5-2-3.5-4.3A1.8 1.8 0 0 1 12 13a1.8 1.8 0 0 1 3.5.7C15.5 16 12 18 12 18Z" /></>,
  luxury: <><path d="M6 4h12l3 5-9 11L3 9z" /><path d="M3 9h18M9 4l3 16M15 4l-3 16" /></>,
};

export default function Icon({ name, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
