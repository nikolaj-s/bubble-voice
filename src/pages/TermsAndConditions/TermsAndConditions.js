import React from 'react'
import { DefaultHeader } from '../../components/DefaultHeader/DefaultHeader'
import ScrollLoadWrapper from '../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper'
import { Card } from '../../components/ui/Wrappers/Card/Card'
import { Markdown } from '../../components/Markdown/Markdown'

export const TermsAndConditions = () => {
    return (
        <>
            <Card>
                <Markdown text={`# 🧾 Terms & Conditions (Bubble)
**Effective Date:** October 18, 2025  
**Operated by:** Nor x West Designs, Salt Spring Island, BC, Canada

---

## 1. Acceptance of Terms
By creating an account or using Bubble, you agree to these Terms & Conditions and all applicable laws and regulations. If you do not agree, you may not use the service.

Bubble (“the Platform”) is a communication and community platform operated by Nor x West Designs (“we,” “our,” or “us”). These terms govern your access to and use of Bubble, including all voice, video, text, and media features.

---

## 2. Eligibility
- You must be at least **13 years old** (or the minimum age required in your region) to use Bubble.  
- If you are under the age of majority, you must have parental consent to use the platform.  
- Bubble may include **18+ content** only in specific communities clearly marked as such. Users are responsible for complying with local laws regarding adult or mature content.

---

## 3. Accounts and Security
- You are responsible for maintaining the security of your account and password.  
- Bubble uses **Google OAuth** for secure authentication.

You agree not to:  
- Impersonate another person or entity.  
- Share your account credentials.  
- Attempt to gain unauthorized access to other users or servers.

> We reserve the right to suspend or terminate accounts that violate these terms.

---

## 4. User-Generated Content
- Bubble allows users to create and share messages, voice communications, media, and other content (“User Content”).  
- By posting User Content on Bubble, you grant Nor x West Designs a **non-exclusive, worldwide, royalty-free license** to host, store, and display that content as necessary to operate the service.  
- You retain ownership of your content.

You agree **not to post content that**:  
- Violates any law or regulation.  
- Contains hate speech, harassment, or explicit non-consensual content.  
- Infringes on intellectual property rights.  
- Contains malware or harmful code.

> We may remove or restrict access to content that violates these standards.

---

## 5. Intellectual Property
All trademarks, designs, and software related to Bubble are owned or licensed by Nor x West Designs.  
You may **not** copy, modify, or distribute any part of the platform without written permission.

---

## 6. Service Availability
Bubble is provided **“as is”** and **“as available.”**  
While we strive for uninterrupted service, we make no guarantees about uptime, functionality, or compatibility with specific devices.

---

## 7. Limitation of Liability
To the fullest extent permitted by law, Nor x West Designs shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the platform, including loss of data, reputation, or profits.

---

## 8. Termination
We reserve the right to suspend or terminate your access to Bubble at any time if you:  
- Violate these Terms.  
- Disrupt the service.  
- Engage in harmful behavior.

---

## 9. Governing Law
These Terms are governed by and construed under the laws of **British Columbia, Canada**.

---

## 10. Contact
If you have questions about these Terms, contact us at:  
**support@bubblevoice.net**
`} />
            </Card>
        </>
    )
}
