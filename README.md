# Fake Store

A prototype of an online store built with React, Vite and the Fake Store API.

### Adding a global cart limit is tricky because it's hard to keep everything in sync:

- When a customer adds a product from the product page, we need to check how many items are already in the cart before allowing more.

- If the customer has multiple tabs open, it can cause problems where the cart doesn't update correctly or shows the wrong total.

- The API doesn't let us update the cart in one step, so we have to manage everything on the client side.

Right now, we've added a rule that limits each product to 10 units at a time. If a customer tries to add the same product again, we check the cart first to make sure the total still doesn't go over the limit.
