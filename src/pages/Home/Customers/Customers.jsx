import React from "react";
import { CustomersPropis } from "./CustomersPropis";
import "./customers.css"

export const Customers = () => {
  return (
    <section>
      <div className="container">
        <h2 className="customers__title">Our happy customers</h2>
        <div className="customers">
          <CustomersPropis
            name="Customer A"
            text="Great product, highly recommended!"
          />

          <CustomersPropis
            name="Customer B"
            text="Great product, highly recommended!"
          />

          <CustomersPropis
            name="Customer C"
            text="Yeaaaah! The fastest delivery ever :-D"
          />

          <CustomersPropis
            name="Customer A"
            text="Great product, highly recommended!"
          />

          <CustomersPropis
            name="Customer B"
            text="Great product, highly recommended!"
          />

          <CustomersPropis
            name="Customer C"
            text="Yeaaaah! The fastest delivery ever :-D"
          />
        </div>
      </div>
    </section>
  );
};
