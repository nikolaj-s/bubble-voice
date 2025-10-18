
import { Card } from '../../components/ui/Wrappers/Card/Card'
import { Markdown } from '../../components/Markdown/Markdown'

export const PrivacyPolicy = () => {
    return (
        <>
            <Card>
                <Markdown text={`# 🔒 Privacy Policy (Bubble)
**Effective Date:** October 18, 2025  
**Operated by:** Nor x West Designs, Salt Spring Island, BC, Canada

---

## 1. Introduction
Bubble (“we,” “our,” “us”) respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use Bubble — our platform for community communication via text, voice, and video.  

By using Bubble, you agree to the practices described in this policy.

---

## 2. Information We Collect
We collect the following information to provide and improve our services:

### a. Account Information
- **Email address** and **username** (via Google OAuth) used to create and manage your account.

### b. Usage Data
- Activity logs (e.g., channel joins, message timestamps).  
- Device and browser type for performance optimization.  
- IP address for security and connection purposes.

### c. Voice and Video Data
- Voice and video communications are **transmitted securely and not stored** on our servers, except temporarily when needed for relaying real-time communication.  
- We do **not record or archive** your voice or video calls.

---

## 3. How We Use Your Information
We use your information to:  
- Provide and maintain Bubble’s features.  
- Authenticate users via Google OAuth.  
- Improve platform stability and performance.  
- Prevent abuse, fraud, or unauthorized access.  
- Communicate service updates or security notices.

---

## 4. Cookies and Third-Party Services
- Bubble uses **Google OAuth** for secure sign-in.  
- We do not use third-party analytics, tracking, or advertising cookies beyond what is necessary for authentication and essential service functionality.

---

## 5. Data Storage and Security
- We take reasonable steps to protect your data from loss, misuse, and unauthorized access.  
- All account data is stored securely and encrypted where possible.  
- Your voice, video, and chat communications are transmitted using **peer-to-peer or server-assisted encryption**, depending on the session type.

---

## 6. Data Retention
- We retain account information (email, username) while your account is active.  
- You may request deletion of your account and data by contacting us at **support@bubblevoice.net**.

---

## 7. Your Rights
Depending on your location, you may have rights to:  
- Access or request a copy of your data.  
- Request correction or deletion.  
- Withdraw consent for data processing (where applicable).  

> We will comply with reasonable requests in accordance with applicable privacy laws (including Canada’s PIPEDA and GDPR standards).

---

## 8. Children’s Privacy
- Bubble is not intended for users under 13.  
- We do not knowingly collect personal data from children under this age.  
- If we discover such data, it will be deleted immediately.

---

## 9. Changes to This Policy
We may update this Privacy Policy periodically. Changes will be posted on this page with a new **Effective Date**.

---

## 10. Contact
If you have questions or requests regarding this Privacy Policy, contact us at:  
**support@bubblevoice.net**
`} />
            </Card>
        </>
    )
}
