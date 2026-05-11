import React, { useEffect, useMemo, useState } from "react";

import Avatar from "../../pods-components/Avatar/Avatar";
import BrandBand from "../../pods-components/BrandBand/BrandBand";
import Button from "../../pods-components/Button/Button";
import Card from "../../pods-components/Card/Card";
import Separator from "../../pods-components/Separator/Separator";
import { ReactComponent as CopyIcon } from "../../assets/ultra-icons/system/action/copy.svg";
import { ReactComponent as RedirectIcon } from "../../assets/ultra-icons/system/action/redirect.svg";
import { ReactComponent as RemoveIcon } from "../../assets/ultra-icons/system/action/remove.svg";
import { ReactComponent as SelectThemed } from "../../assets/ultra-icons/system/status/select_themed.svg";
import { ReactComponent as TxnSuccessThemed } from "../../assets/ultra-icons/system/status/txn_success_themed.svg";
import { ReactComponent as WhatsAppIcon } from "../../assets/ultra-icons/system/social/whatsapp.svg";

// @ts-ignore — pattern story asset (recipient portrait)
import recipientAvatarImg from "./story-assets/recipient-avatar.jpg";
// @ts-ignore — passbook story asset (placeholder bank mark)
import bankAxis from "../../pods-components/PassbookTile/story-assets/bank-axis.png";
// @ts-ignore — passbook story asset (placeholder bank mark)
import bankSbi from "../../pods-components/PassbookTile/story-assets/bank-sbi.png";
// @ts-ignore — pattern story asset (sender portrait, distinct from recipient)
import senderAvatarImg from "./story-assets/sender-avatar.jpg";

import cx from "../../utils/classNames";

import s from "./PostPaymentPattern.module.scss";

export interface PostPaymentPatternProps {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onCheckBalance?: () => void;
  onShareReceipt?: () => void;
  onPayAgain?: () => void;
  onCopyUpiRef?: () => void;
}

const SAMPLE_AMOUNT = 600;
const RECIPIENT_NAME = "Anjali Sinha";
const PAYEE_UPI_HANDLE = "anjalisinha@ybl";
const UPI_REF_DISPLAY = "9987 4598 4759";
const DATE_TIME_VALUE = "5 Feb 2026, 12:30 PM";
const MESSAGE_VALUE = "For the drinks";
const SENDER_NAME = "Rahul Saini";
const SENDER_UPI_HANDLE = "687989087890@ptyes";
const SENDER_BANK_MASK = "SBI **** 7878";

const EXPAND_CORNER_LABEL_MS = 4000;
const EXPAND_CORNER_COLLAPSE_MS = 340;

type ExpandCornerPhase = "text" | "collapsing" | "icon";

const DetailBlock: React.FC<{ label: string; value: string; prominent?: boolean }> =
  ({ label, value, prominent }) => (
    <div className={cx(s.detailBlock, prominent && s.detailBlockProminent)}>
      <span className={s.detailLabel}>{label}</span>
      <span className={s.detailValue}>{value}</span>
    </div>
  );

const PostPaymentPattern: React.FC<PostPaymentPatternProps> = ({
  expanded,
  onExpandedChange,
  onCheckBalance,
  onShareReceipt,
  onPayAgain,
  onCopyUpiRef,
}) => {
  const amountText = useMemo(
    () => new Intl.NumberFormat("en-IN").format(SAMPLE_AMOUNT),
    [],
  );

  const [cornerPhase, setCornerPhase] = useState<ExpandCornerPhase>("text");

  useEffect(() => {
    setCornerPhase("text");
    const timer = window.setTimeout(() => {
      setCornerPhase("collapsing");
    }, EXPAND_CORNER_LABEL_MS);
    return () => window.clearTimeout(timer);
  }, [expanded]);

  useEffect(() => {
    if (cornerPhase !== "collapsing") {
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setCornerPhase("icon");
    }, EXPAND_CORNER_COLLAPSE_MS);
    return () => window.clearTimeout(timer);
  }, [cornerPhase]);

  const expandLabelText = expanded ? "View Less" : "View More";
  const expandIconOnly = cornerPhase === "icon";

  const copyUPIReference = () => {
    onCopyUpiRef?.();
  };

  return (
    <div className={s.root} data-testid="post-payment-pattern">
      <Card customClass={s.card}>
        <div className={s.body}>
          <Button
            type="tonal"
            size="medium"
            label={expandIconOnly ? "" : expandLabelText}
            ariaLabel={expandIconOnly ? expandLabelText : undefined}
            TrailingIcon={
              expanded ? <RemoveIcon aria-hidden /> : <RedirectIcon aria-hidden />
            }
            customClass={cx(
              s.expandCornerBtn,
              cornerPhase === "collapsing" && s.expandCornerCollapsing,
            )}
            ariaExpanded={expanded}
            onClick={() => onExpandedChange(!expanded)}
          />

          <div className={s.contentShell}>
            <div
              className={cx(
                s.swapPanel,
                expanded ? s.swapPanelHidden : s.swapPanelShown,
              )}
              aria-hidden={expanded}
            >
              <div className={s.mini}>
                <Avatar
                  type="profile"
                  size="large"
                  customClass={s.miniAvatar}
                  avatarProfile={{ imageURL: String(recipientAvatarImg) }}
                />
                <div className={s.miniNameRow}>
                  <span className={s.miniName}>{RECIPIENT_NAME}</span>
                  <span
                    className={s.verifiedBadge}
                    role="img"
                    aria-label="Verified account"
                  >
                    <SelectThemed aria-hidden />
                  </span>
                </div>
                <div className={s.miniAmountRow}>
                  <div className={s.miniAmountInline}>
                    <span className={s.miniAmountFigures}>
                      <span className={s.miniRupee} aria-hidden>
                        ₹
                      </span>
                      <span className={s.miniAmountDigits}>{amountText}</span>
                    </span>
                    <span
                      className={cx(s.txnSuccessIcon, s.txnSuccessMini)}
                      aria-hidden
                    >
                      <TxnSuccessThemed />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cx(
                s.swapPanel,
                expanded ? s.swapPanelShown : s.swapPanelHidden,
              )}
              aria-hidden={!expanded}
            >
              <div className={s.expandedMain}>
                <div className={s.expandedHero}>
                  <Avatar
                    type="profile"
                    size="large"
                    customClass={cx(s.miniAvatar, s.expandedRecipientAvatar)}
                    avatarProfile={{ imageURL: String(recipientAvatarImg) }}
                  />
                  <div className={s.expandedIdentity}>
                    <div className={s.expandedNameRow}>
                      <span className={s.miniName}>{RECIPIENT_NAME}</span>
                      <span
                        className={cx(s.verifiedBadge, s.verifiedBadgeExpanded)}
                        role="img"
                        aria-label="Verified account"
                      >
                        <SelectThemed aria-hidden />
                      </span>
                    </div>
                    <div className={s.expandedUpiHandleRow}>
                      <span className={s.expandedUpiHandle}>
                        {PAYEE_UPI_HANDLE}
                      </span>
                      <Avatar
                        type="logo"
                        size="small"
                        customClass={s.expandedUpiBankLogo}
                        avatarLogo={{
                          image: String(bankAxis),
                          alt: "",
                        }}
                      />
                    </div>
                  </div>
                  <div className={s.expandedAmountBlock}>
                    <div className={s.expandedAmountInline}>
                      <span className={s.expandedAmountFigures}>
                        <span className={s.expandedRupee} aria-hidden>
                          ₹
                        </span>
                        <span className={s.expandedAmountDigits}>
                          {amountText}
                        </span>
                      </span>
                      <span
                        className={cx(s.txnSuccessIcon, s.txnSuccessLg)}
                        aria-hidden
                      >
                        <TxnSuccessThemed />
                      </span>
                    </div>
                  </div>
                </div>

                <div className={s.upiReferenceSection}>
                  <span className={s.upiRefHeading}>UPI Reference No</span>
                  <div className={s.upiRefValueRow}>
                    <span className={s.upiRefNumber}>{UPI_REF_DISPLAY}</span>
                    <button
                      type="button"
                      className={cx(s.copyIconBtn, s.copyIconBare)}
                      aria-label="Copy UPI reference number"
                      onClick={copyUPIReference}
                    >
                      <CopyIcon />
                    </button>
                  </div>
                </div>

                <div className={s.dashedRule} />

                <DetailBlock
                  prominent
                  label="Date and Time"
                  value={DATE_TIME_VALUE}
                />
                <Separator hairline />
                <DetailBlock prominent label="Message" value={MESSAGE_VALUE} />
                <Separator hairline />

                <div className={s.senderRow}>
                  <div className={s.senderCopy}>
                    <span className={s.senderCaption}>{SENDER_NAME}</span>
                    <span className={s.senderVpa}>{SENDER_UPI_HANDLE}</span>
                    <div className={s.senderBankRow}>
                      <span className={s.senderBankText}>{SENDER_BANK_MASK}</span>
                      <img
                        src={String(bankSbi)}
                        alt=""
                        className={s.senderBankMark}
                      />
                    </div>
                  </div>
                  <Avatar
                    type="profile"
                    size="regular"
                    customClass={cx(s.trailingProfile, s.senderAvatar)}
                    avatarProfile={{ imageURL: String(senderAvatarImg) }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={cx(s.footer, expanded ? s.footerThree : s.footerTwo)}
          >
            <Button
              type="tonal"
              size="medium"
              label="Check Balance"
              customClass={s.footerBtn}
              onClick={() => onCheckBalance?.()}
            />
            <Button
              type="filled"
              size="medium"
              label="Share Receipt"
              LeadingIcon={<WhatsAppIcon aria-hidden />}
              customClass={cx(s.footerBtn, s.shareBtn)}
              onClick={() => onShareReceipt?.()}
            />
            {expanded ? (
              <Button
                type="tonal"
                size="medium"
                label="Pay Again"
                customClass={s.footerBtn}
                onClick={() => onPayAgain?.()}
              />
            ) : null}
          </div>
        </div>
        <BrandBand />
      </Card>
    </div>
  );
};

export default PostPaymentPattern;
