declare global {
  interface Window {
    twq: any;
  }
}

export const trackTwitterConversion = () => {
  if (typeof window !== "undefined" && window.twq) {
    window.twq("event", "tw-pi3z1-pi3z1", {});
  }
};
