export interface OTPProps {
	value: string,
	onChange: (e: string) => void,
	inputLength?: number,
	title?: string,
  error?: string,
	warning?: string,
	resendOTPInterval?: number,
	onResendOTPClick?: () => void,
  resendOTPText?: string,
	alternativeActionText?: string,
	onAlternativeActionClick?: () => void
	customClass?: string,
	inputProps?: {[x:string]: any},
}