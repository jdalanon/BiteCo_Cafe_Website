# ☕ Bite Co. Website

Bite Co. is a responsive coffee and snack ordering website designed for customers to browse products, register an account, place orders, and complete checkout securely. The system combines a modern front-end experience with Supabase authentication and database storage, enabling a smooth online ordering workflow.

## 🌟 Overview

This project allows users to:

- register an account and save their profile information to the Supabase User table
- log in securely using Supabase authentication
- access the Home page after login
- browse and order drinks and snacks
- view the About page and Contact Us page
- change the quantity of selected items before checkout
- view and manage their profile dashboard
- edit and save profile details
- log out of their account
- proceed to checkout with Cash on Delivery
- select GCash, Maya, or CIMB as a fund transfer payment option
- store order, payment, and user details in the database

## ✨ Core Features

### User Registration and Authentication
- Users can create an account through the registration page.
- Registration data is stored in the Supabase-backed user profile structure.
- Login uses Supabase authentication for secure sign-in.
- Authenticated users can access the Home page and other protected features.

### Menu and Ordering
- Users can view available drinks and snacks from the menu page.
- Customers can add items to cart and adjust item quantities before checkout.
- Orders can be placed with the selected payment method.

### Browsing Pages
- Customers can access:
  - Home
  - About
  - Contact Us
  - Cart / Checkout
  - Profile Dashboard

### Profile Management
- Authenticated users can view their profile dashboard.
- They can edit personal information and save updates.
- Payment method preferences can also be updated from the profile page.

### Checkout and Payment
- Customers can proceed to checkout directly for Cash on Delivery.
- For bank or e-wallet transfer payments, users can select GCash, Maya, or CIMB.
- Payment details and proof of payment can be stored in the database for order tracking.

## 🛠️ Technology Stack

- HTML5
- CSS3
- JavaScript
- Supabase Auth
- Supabase Database
- Supabase Storage / S3-compatible object storage integration

## 📁 Project Structure

```text
BiteCo_Cafe_Website/
├── css/
├── js/
│   ├── shared/
│   │   └── supabase.js
│   └── user/
│       ├── cart.js
│       ├── contact.js
│       ├── login.js
│       ├── menu.js
│       ├── navbar.js
│       ├── payment.js
│       ├── profile.js
│       └── register.js
├── user/
├── admin/
├── index.html
├── package.json
└── README.md
```

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone <your-repository-url>
```

2. Install dependencies:

```bash
npm install
```

3. Open the project in your browser by launching the main HTML file or using a local server.

4. Make sure your Supabase project URL and anonymous key are configured correctly in the shared Supabase initialization file.

## 🧩 User Flow

1. Register a new account.
2. Log in with the registered credentials.
3. Browse the Home page and menu.
4. Add drinks or snacks to the cart.
5. Update the quantity of each item before checkout.
6. Proceed to checkout with the preferred payment method.
7. Complete the purchase and save order details to the database.
8. View or update profile details from the dashboard.
9. Log out when finished.

## 🗄️ Supabase Database Documentation

The application uses Supabase as the primary backend service for authentication and database operations.

### Authentication
- Registration and login are handled through Supabase Auth.
- Authenticated users receive a session token that allows access to protected pages.

### Main Database Tables

#### User
Stores the customer profile information.

Suggested fields:
- user_id
- full_name
- email
- role
- payment_method
- created_at

Example payload:

```json
{
  "user_id": "uuid",
  "full_name": "Juan Dela Cruz",
  "email": "juan@example.com",
  "role": "customer",
  "payment_method": "Cash on Delivery",
  "created_at": "2026-08-07T00:00:00Z"
}
```

#### Order
Stores the customer order summary.

Suggested fields:
- order_id
- user_id
- items
- total_amount
- payment_method
- payment_status
- order_status
- created_at

Example payload:

```json
{
  "user_id": "uuid",
  "items": [
    {
      "menu_name": "Iced Latte",
      "price": 120,
      "quantity": 2
    }
  ],
  "total_amount": 240,
  "payment_method": "GCash",
  "payment_status": "Pending",
  "order_status": "Pending"
}
```

#### Order_Items
Stores each ordered item separately.

Suggested fields:
- order_item_id
- order_id
- menu_name
- price
- quantity
- image_url

#### Payment_Proof
Stores payment evidence for transfer-based payments.

Suggested fields:
- payment_proof_id
- order_id
- payment_name
- receipt_url
- uploaded_at

#### Payment_Settings
Stores payment channels such as GCash, Maya, and CIMB.

Suggested fields:
- payment_id
- payment_name
- account_name
- account_number
- qr_code_url

### Supabase REST API Notes
- Use the Supabase JavaScript client for front-end authentication and database access.
- For backend or custom integrations, use the Supabase REST endpoint:

```text
https://<project-ref>.supabase.co/rest/v1/
```

- Include the Authorization header with the Supabase anon or service role key depending on your setup.

## 🧠 S3 Bucket API Documentation

The application can use an S3-compatible object storage service for uploading customer proof of payment images and media assets.

### Storage Purpose
- upload receipt images
- store product images
- save profile or order media files

### Recommended Bucket Structure

```text
uploads/
├── payments/
├── menu/
└── profiles/
```

### Upload Flow
1. Request a pre-signed upload URL from your backend.
2. Upload the file directly to S3 using a PUT request.
3. Save the returned object URL in the database.

### Example Presigned URL Request

```json
{
  "fileName": "receipt-001.png",
  "contentType": "image/png",
  "folder": "payments"
}
```

### Example Presigned URL Response

```json
{
  "uploadUrl": "https://<bucket-name>.s3.amazonaws.com/payments/receipt-001.png",
  "objectKey": "payments/receipt-001.png"
}
```

### Upload Example

```bash
curl -X PUT "<uploadUrl>" \
  -H "Content-Type: image/png" \
  --data-binary @receipt.png
```

### Notes
- Use signed URLs for secure uploads.
- Restrict public access for payment receipts.
- Store the resulting object URL in the database for later retrieval.

## 🔐 Security and Best Practices

- Never expose service role keys in client-side code.
- Use Supabase Row Level Security (RLS) where possible.
- Validate uploaded files before storing them.
- Protect authentication sessions and prevent unauthorized access to user data.

## 👩‍💻 Author

Developed by Julie Ann Dalanon

---
