# TODO

## Booking page migration (React -> PHP external page)
- [x] Create `external-pages/booking/index.php` (PHP booking form) that posts to `admin-dashboard/api/create-booking.php`.
- [x] Create `external-pages/booking/children.php` (PHP children quotation form) that posts to `admin-dashboard/api/create-booking.php`.
- [x] Add basic success/error handling on the external pages.

- [ ] Implement 3-step wizard UI in `external-pages/booking/index.php` (matches React Booking.tsx steps).
- [ ] Implement 4-step wizard UI in `external-pages/booking/children.php` (matches React ChildrensBooking.tsx steps).
- [ ] Test submissions end-to-end (both forms) and verify rows appear in admin dashboard `bookings.php`.


