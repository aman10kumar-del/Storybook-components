export interface PasscodeProps {
	value: string,
	onChange: (e: string) => void,
	inputLength?: number,
	title?: string,
  error?: string,
	alternativeActionText?: string,
	forgotPasscodeText?: string,
	onAlternativeActionClick?: () => void
	onForgotPasscodeClick?: () => void
	customClass?: string,
	inputProps?: {[x:string]: any},
}