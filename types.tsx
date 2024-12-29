export interface UserDetailType {
	id: number;
	name: string;
	email: string;
	imageUrl: string;
	credits: number;
	subscriptionStatus: string;
	subscriptionType: string;
	nextBillingDate: Date;
	createdAt: Date;
}
