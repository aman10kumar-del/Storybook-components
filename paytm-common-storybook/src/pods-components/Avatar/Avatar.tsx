import React, { Fragment } from "react";

import {
	AvatarIconProps, AvatarInitialsProps, AvatarLogoProps, AvatarProfileProps, AvatarProps
} from "./Avatar.types";
import { ReactComponent as SelectIcon } from "../../assets/ultra-icons/system/status/select_themed.svg";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import s from "./Avatar.module.scss";
import { getInitialsColorClass } from "./Avatar.utils";

const Avatar: React.FC<AvatarProps> = (props) => {
	const {
		size = "regular",
		type = "profile",
		customClass = "",
		Icon,
		iconType,
		selected,
		onAvatarClick
	} = props;

	const AvatarContainer = ({children, testID, classNames}: {children: React.ReactNode, testID: string, classNames: string}) => {
		return (
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
			<div
				role="img"
				aria-label="avatar"
				data-testid={testID}
				className={cx(s.avatarContainer, `${s[size]}`, classNames, customClass, {
					[s.selected]: selected && !Icon
				})}
				onClick={() => {
					triggerCallback(onAvatarClick)
				}}
			>
				{Icon && (
					<span
						data-testid={`${iconType}-icon`}
						className={cx(s.sideIcon, `${s[`${iconType}Icon`]}`)}
					>
						{Icon}
					</span>
				)}
				{selected && !Icon && (
					<span
						data-testid="selected-icon"
						className={cx(s.sideIcon, s.selectedIcon)}
					>
						<SelectIcon />
					</span>
				)}
				{children}
			</div>
		)
	}

	const renderIcon = () => {
		const {
			avatarIcon: {
				Icon,
				outline = false,
				iconColor,
				id
			} = {}
		} = props as AvatarIconProps
		
		// Determine color class
		let colorClass: string | null = null;
		
		if (iconColor) {
			// Normalize id to string for hashing
			const colorKey = id !== undefined && id !== null ? String(id) : "";
			
			if (iconColor === "deterministic") {
				// For deterministic, we need an id
				if (colorKey) {
					colorClass = getInitialsColorClass(iconColor, colorKey);
				}
				// If no id available, colorClass remains null (fallback to static)
			} else {
				// For "random" or specific color, use directly
				colorClass = getInitialsColorClass(iconColor, colorKey);
			}
		}
		// If iconColor is undefined, colorClass stays null (use static color)
		const colorClassName = colorClass && s[colorClass] ? s[colorClass] : undefined;
		const content = (
			<span className={cx(s.iconContainer, colorClassName)}>
				<span
					data-testid="icon"
					className={s.icon}
				>
					{Icon}
				</span>
			</span>

		)

		return (
			<AvatarContainer
				testID="avatar-icon-container"
				classNames={cx(s.avatarIcon, `${s[outline ? "outline" : "fill"]}`)}
			>
				{content}
			</AvatarContainer>
		)
		// return wrapAvatarContainer(content, cx(s.avatarIcon, `${s[iconType]}`), "avatar-icon-container")
	}

	const renderLogo = () => {
		const {
			avatarLogo: {
				image = "",
				outline = false,
				fallbackImage,
				alt: logoAlt = "logo",
			} = {}
		} = props as AvatarLogoProps

		const content = (
			<Fragment>
				{image && (
					<img
						data-testid="logo-image"
						className={cx(s.image, s.logoImage, { [s.outline]: outline })}
						src={image}
						alt={logoAlt}
						onError={(e) => {
							if (!fallbackImage) {
								return;
							}
							const el = e.currentTarget;
							if (el.dataset.avatarLogoFallback === "1") {
								return;
							}
							el.dataset.avatarLogoFallback = "1";
							el.src = fallbackImage;
						}}
					/>
				)}
			</Fragment>
		)
		// return wrapAvatarContainer(content, cx(s.avatarLogo, {
		// 	[s.selected]: selected && !StatusIcon
		// }), "avatar-logo-container")
		return (
			<AvatarContainer
				testID="avatar-logo-container"
				classNames={cx(s.avatarLogo, {
					// [s.selected]: selected && !StatusIcon
				})}
			>
				{content}
			</AvatarContainer>
		)
	}

	const renderInitials = () => {
		const {
			avatarInitials: {
				initials = "",
				initialsColor = "deterministic"
			} = {}
		} = props as AvatarInitialsProps;
		const content = (
			<span
				data-testid="profile-initials"
				className={cx(s.profileInitials, initialsColor && s[getInitialsColorClass(initialsColor, initials)])}
			>
				{initials?.toUpperCase()}
			</span>
		)
		return (
			<AvatarContainer
				testID="avatar-initials-container"
				classNames={cx(s.avatarInitials)}
			>
				{content}
			</AvatarContainer>
		)
	}
	const renderProfile = () => {
		const {
			avatarProfile: {
				imageURL = ""
			} = {}
		} = props as AvatarProfileProps

		const content = (
			<img
				data-testid="profile-image"
				className={cx(s.image, s.profileImage)}
				src={imageURL}
				alt="profile"
			/>
		)

		// return wrapAvatarContainer(content, cx(s.avatarProfile, {
		// 	[s.selected]: selected && !Icon
		// }), "avatar-profile-container")
		return (
			<AvatarContainer
				testID="avatar-profile-container"
				classNames={cx(s.avatarProfile, {
					// [s.selected]: selected && !Icon
				})}
			>
				{content}
			</AvatarContainer>
		)
	}

	if (type === "icon") {
		return renderIcon()
	}
  if (type === "logo") {
		return renderLogo()
	}
	if (type === "initials") {
		return renderInitials()
	}
	return renderProfile()
};

export default React.memo(Avatar);
