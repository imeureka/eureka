// src/shared/utils.ts

export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("ko-KR", {
		style: "currency",
		currency: "KRW",
	}).format(amount);
};

export const capitalizeFirstLetter = (str: string): string => {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
};
