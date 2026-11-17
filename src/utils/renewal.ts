// Album renewal window: valid until 10 October 2027
export const RENEWAL_END = new Date(2027, 9, 10); // 10 October 2027

export const isRenewalDue = (): boolean => Date.now() >= RENEWAL_END.getTime();

export const msUntilRenewal = (): number => RENEWAL_END.getTime() - Date.now();
