# Project Assignment: ClaimWise — An Insurance Claims Platform

## Overview

ClaimWise is a platform where policyholders file insurance claims and adjusters review and settle them — without an adjuster having to start from a blank claim every time. When a Claimant files a claim, an intelligent panel reads everything submitted — the description, the photos, the supporting documents — and hands the Adjuster a clear, structured assessment instead of a raw folder of files to sort through.

The platform has three kinds of people, each with a different view of the product and a different set of things they're allowed to do. The whole experience should feel alive — people should see things update in front of them the moment something happens, and they should get timely emails when something needs their attention.

Build the complete product described below. Nothing here is optional unless explicitly marked as optional.

---

## Who Uses ClaimWise

There are exactly three roles. Every person using the platform belongs to one of these roles, and what they can see and do is strictly limited by their role.

**1. Claimant**
A Claimant is a policyholder filing a claim. They can start a new claim, describe what happened, upload photos and supporting documents, and track the status of their claim. A Claimant can only see and manage their own claims — never anyone else's.

**2. Adjuster**
An Adjuster reviews and settles claims. They can see every claim assigned to them, read the intelligent panel's assessment for each one, communicate with the Claimant, and approve, deny, or request more information on a claim. An Adjuster can see all claims assigned to them, but not claims that belong to other Adjusters unless explicitly given access.

**3. Admin**
An Admin manages the platform itself. They can create and remove accounts, assign roles, assign claims to Adjusters, manage claim categories (for example, "Auto," "Home," "Travel"), and view all activity across every claim in the system. An Admin does not personally assess or settle claims as part of their day-to-day role, but has full visibility into the platform.

A person attempting an action outside their role should be clearly and immediately blocked. For example, a Claimant should never be able to see another Claimant's claim, and an Adjuster should never be able to reassign claims to other Adjusters.

---

## Module 1: Accounts and Access

Nobody sets a password on ClaimWise. To log in, a person enters their email address, and a one-time code is sent to that email. They enter the code and are logged in. There is no separate password to remember or reset.

Once logged in, every person has a profile. Claimants can set their contact details, upload a profile picture, and keep documents like their policy details or identification attached to their profile for future claims. All uploaded files must be stored securely and reliably, and must load quickly whenever they're displayed.

An Admin is the only one who can create new accounts directly and decide what role each account has. When an Admin creates an account, the person receives an email inviting them to log in for the first time.

---

## Module 2: Filing a Claim

This is where Claimants work. A Claimant can start a new claim by choosing a claim category, writing a description of what happened, and entering basic details like the date and estimated cost. They can upload photos of the damage or incident, receipts, police or incident reports, and any other supporting document. These files should be properly stored, retrievable at any time, and clearly attached to the claim they belong to.

Once submitted, a claim moves into a pending state and enters the assessment process. The Claimant can always see the current status of their claim: submitted, under review, more information requested, approved, or denied.

---

## Module 3: The Intelligent Claims Assessment Panel

This is the heart of what makes ClaimWise different, and it is the part of this assignment you should give the most thought and care to.

When a Claimant submits a claim, it does not land in the Adjuster's queue as a raw, unread submission. Instead, it is first read and evaluated by a panel of independent reviewers — each one focused on a different concern, each one doing its job without a human telling it what to look for each time. Design and build **at least four such reviewers**, each with a clearly distinct responsibility. For example (you are free to design your own, as long as each has a genuinely distinct focus and adds real value):

- A reviewer that reads the claim and produces a short, clear summary of what happened and what's being claimed, so the Adjuster doesn't have to piece it together from scratch.
- A reviewer that checks whether the claim has everything it needs to be assessed — for instance, whether a photo or document referenced in the description was actually attached.
- A reviewer that compares the claimed cost against similar past claims in the same category and flags whether it looks reasonable, unusually low, or unusually high.
- A reviewer that checks the claim for internal consistency and potential red flags — for example, whether the description, the date, and the attached documents all line up, or whether something about the submission looks worth a closer look.

Each of these reviewers should genuinely read the claim and its attached materials and produce its own independent findings — not just repeat a generic response. Once all reviewers have finished, their individual findings should be brought together by a final step that produces one clear, consolidated assessment for the Adjuster: a short summary of the claim, anything missing or inconsistent, and an overall suggestion of whether it looks straightforward to approve, needs more information, or needs closer manual scrutiny — always presented as a suggestion for the Adjuster to confirm, not a final decision.

This entire process should run automatically the moment a claim is submitted, without any person needing to trigger it manually. The Claimant and Adjuster should be able to see, in real time, that a claim is currently being processed by the panel, and see the panel's full assessment (visible to the Adjuster) the moment it's ready — appearing on screen without needing to refresh the page.

The quality, independence, and usefulness of this panel — not just that it technically runs — is the single most important part of this assignment.

---

## Module 4: Adjuster Review and Decisions

Once the intelligent panel has finished assessing a claim, it appears in the Adjuster's queue along with the panel's full assessment displayed clearly alongside the Claimant's actual submission. The Adjuster reads both and then makes one of three decisions:

- **Approve** — the claim is accepted and moves toward payout.
- **Deny** — the claim is turned down, with a reason shared with the Claimant.
- **Request more information** — the claim is sent back to the Claimant with specific comments explaining what's needed. Once the Claimant provides it and resubmits, the claim should go through the intelligent panel again before returning to the Adjuster.

Whatever decision the Adjuster makes should be reflected instantly on the Claimant's side — the Claimant should see the status change and any comments appear live, without refreshing their page.

---

## Module 5: Claimant Portal and Payout Tracking

Every Claimant has a personal dashboard where they can see the live status of every claim they've filed, updating in real time as the Adjuster works through it. Once a claim is approved, the Claimant should be able to see payout details and track the payout's status through to completion on the same dashboard. If a Claimant disagrees with a decision, they should be able to submit a dispute directly from the platform, which should appear instantly in the Adjuster's queue for a second look.

---

## Module 6: Notifications and Activity

People should never have to go looking for updates — ClaimWise should tell them. Build a notification system covering at least the following moments, each triggering both an email and an instantly visible update inside the platform itself:

- A one-time login code, sent the moment someone tries to log in.
- A welcome email, sent the moment an Admin creates a new account for someone.
- A confirmation to the Claimant the moment their claim finishes being processed by the intelligent panel and is now with the Adjuster.
- A notification to the Adjuster the moment a new claim is ready in their queue.
- A notification to the Claimant the moment the Adjuster approves, denies, or requests more information on their claim.
- A confirmation to the Claimant the moment a payout is issued, and a notification to the Adjuster the moment a Claimant files a dispute.

Inside the platform, every person should have an activity area (for example, a notification bell or panel) that fills up with these updates the moment they happen, without needing to refresh the page. Read and unread updates should be clearly distinguishable.

---

## What "Done" Looks Like

By the end of this assignment, someone should be able to:

1. Log in without ever typing a password.
2. File a claim as a Claimant, describing what happened and uploading supporting photos and documents.
3. Watch, in real time, as an intelligent panel of at least four independent reviewers processes the claim and produces a genuinely useful, consolidated assessment.
4. See an Adjuster act on that assessment — approving, denying, or requesting more information — with the result reflected instantly on the Claimant's side.
5. See a Claimant track a payout live and file a dispute that the Adjuster sees instantly.
6. Receive timely emails and in-platform updates at every meaningful moment along the way.
7. See every one of the above behave correctly and safely depending on whether the person doing it is a Claimant, an Adjuster, or an Admin.

This document describes the product only. How you build it — the tools, the structure, the design of each part — is entirely up to you.
