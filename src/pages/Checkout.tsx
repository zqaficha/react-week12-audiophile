import { useReducer, type Dispatch, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { Action, State } from "../reducer";
import ProductImage from "../components/ProductImage";

const Button = styled.button`
  background: #d87d4a;
  color: white;
  border: none;
  padding: 15px 32px;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  &:hover {
    background: #fbaf85;
  }
`;

const Page = styled.div`
  background: #f1f1f1;
  padding: 40px 8% 80px;
`;
const Back = styled.button`
  background: none;
  border: none;
  color: #777;
  margin-bottom: 24px;
  font-size: 15px;
`;
const Layout = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
`;
const Form = styled.form`
  flex: 2;
  background: white;
  padding: 48px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;
const Title = styled.h1`
  grid-column: 1 / 3;
  font-size: 32px;
`;
const Section = styled.p`
  grid-column: 1 / 3;
  color: #d87d4a;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 16px;
`;
const Wide = styled.div`
  grid-column: 1 / 3;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 9px;
  font-size: 12px;
  font-weight: bold;
  .top {
    display: flex;
    justify-content: space-between;
  }
  .error {
    color: #cd2c2c;
    font-weight: normal;
  }
  input {
    padding: 18px 24px;
    border: 1px solid #cfcfcf;
    border-radius: 8px;
    font-size: 14px;
  }
  input:focus {
    outline: none;
    border-color: #d87d4a;
  }
`;
const PaymentRow = styled.div`
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;
const Radio = styled.label<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 16px;
  cursor: pointer;
  border: 1px solid ${(p) => (p.$active ? "#d87d4a" : "#cfcfcf")};
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
`;
const CashInfo = styled.div`
  grid-column: 1 / 3;
  display: flex;
  gap: 32px;
  align-items: center;
  color: #777;
  line-height: 1.7;
  font-size: 15px;
  span {
    font-size: 40px;
  }
`;

const Summary = styled.div`
  flex: 1;
  background: white;
  padding: 32px;
  border-radius: 8px;
  h3 {
    font-size: 18px;
    margin-bottom: 30px;
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  .image {
    width: 64px;
  }
  .info {
    flex: 1;
    font-size: 15px;
    font-weight: bold;
  }
  .info p {
    color: #777;
    font-size: 14px;
    margin-top: 4px;
  }
  .qty {
    color: #777;
    font-weight: bold;
  }
`;
const Line = styled.p`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
  color: #777;
  text-transform: uppercase;
  b {
    color: #101010;
    font-size: 18px;
  }
`;
const Grand = styled(Line)`
  margin-top: 24px;
  margin-bottom: 32px;
  b {
    color: #d87d4a;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Done = styled.div`
  background: white;
  padding: 48px;
  border-radius: 8px;
  max-width: 420px;
`;

type Values = {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  eMoneyNumber: string;
  eMoneyPin: string;
};
type Errors = Partial<Record<keyof Values, string>>;
type FormState = { values: Values; payment: "emoney" | "cash"; errors: Errors };
type FormAction =
  | { type: "CHANGE"; field: keyof Values; value: string }
  | { type: "PAYMENT"; payment: "emoney" | "cash" }
  | { type: "ERRORS"; errors: Errors };

const startForm: FormState = {
  values: {
    name: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    eMoneyNumber: "",
    eMoneyPin: "",
  },
  payment: "emoney",
  errors: {},
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: "" },
      };
    case "PAYMENT":
      return { ...state, payment: action.payment };
    case "ERRORS":
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}

type FieldProps = {
  label: string;
  field: keyof Values;
  placeholder: string;
  form: FormState;
  formDispatch: Dispatch<FormAction>;
};

function Field({ label, field, placeholder, form, formDispatch }: FieldProps) {
  const error = form.errors[field];
  return (
    <Label>
      <span className="top">
        <span style={{ color: error ? "#cd2c2c" : "inherit" }}>{label}</span>
        {error && <span className="error">{error}</span>}
      </span>
      <input
        placeholder={placeholder}
        value={form.values[field]}
        style={{ borderColor: error ? "#cd2c2c" : undefined }}
        onChange={(e) =>
          formDispatch({ type: "CHANGE", field, value: e.target.value })
        }
      />
    </Label>
  );
}

type Props = { state: State; dispatch: Dispatch<Action> };

export default function Checkout({ state, dispatch }: Props) {
  const [form, formDispatch] = useReducer(formReducer, startForm);
  const navigate = useNavigate();

  let total = 0;
  for (const item of state.cart) total += item.price * item.qty;
  const shipping = 50;
  const vat = Math.round(total * 0.2);
  const grandTotal = total + shipping;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const v = form.values;
    const errors: Errors = {};

    if (!v.name.trim()) errors.name = "Can't be empty";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = "Wrong format";
    if (!v.phone.trim()) errors.phone = "Can't be empty";
    if (!v.address.trim()) errors.address = "Can't be empty";
    if (!v.zip.trim()) errors.zip = "Can't be empty";
    if (!v.city.trim()) errors.city = "Can't be empty";
    if (!v.country.trim()) errors.country = "Can't be empty";
    if (form.payment === "emoney") {
      if (!v.eMoneyNumber.trim()) errors.eMoneyNumber = "Can't be empty";
      if (!v.eMoneyPin.trim()) errors.eMoneyPin = "Can't be empty";
    }

    formDispatch({ type: "ERRORS", errors });

    if (Object.values(errors).every((x) => !x) && state.cart.length > 0) {
      dispatch({ type: "FINISH_ORDER" });
    }
  }

  const fieldProps = { form, formDispatch };

  return (
    <Page>
      <Back onClick={() => navigate(-1)}>Go Back</Back>

      <Layout>
        <Form id="checkout-form" onSubmit={handleSubmit} noValidate>
          <Title>CHECKOUT</Title>

          <Section>Billing details</Section>
          <Field
            label="Name"
            field="name"
            placeholder="Alexei Ward"
            {...fieldProps}
          />
          <Field
            label="Email Address"
            field="email"
            placeholder="alexei@mail.com"
            {...fieldProps}
          />
          <Field
            label="Phone Number"
            field="phone"
            placeholder="+1 202-555-0136"
            {...fieldProps}
          />

          <Section>Shipping info</Section>
          <Wide>
            <Field
              label="Address"
              field="address"
              placeholder="1137 Williams Avenue"
              {...fieldProps}
            />
          </Wide>
          <Field
            label="ZIP Code"
            field="zip"
            placeholder="10001"
            {...fieldProps}
          />
          <Field
            label="City"
            field="city"
            placeholder="New York"
            {...fieldProps}
          />
          <Field
            label="Country"
            field="country"
            placeholder="United States"
            {...fieldProps}
          />

          <Section>Payment details</Section>
          <PaymentRow>
            <span style={{ fontSize: 12, fontWeight: "bold" }}>
              Payment Method
            </span>
            <div style={{ display: "grid", gap: 16 }}>
              <Radio $active={form.payment === "emoney"}>
                <input
                  type="radio"
                  checked={form.payment === "emoney"}
                  onChange={() =>
                    formDispatch({ type: "PAYMENT", payment: "emoney" })
                  }
                />
                e-Money
              </Radio>
              <Radio $active={form.payment === "cash"}>
                <input
                  type="radio"
                  checked={form.payment === "cash"}
                  onChange={() =>
                    formDispatch({ type: "PAYMENT", payment: "cash" })
                  }
                />
                Cash on Delivery
              </Radio>
            </div>
          </PaymentRow>

          {form.payment === "emoney" ? (
            <>
              <Field
                label="e-Money Number"
                field="eMoneyNumber"
                placeholder="238521993"
                {...fieldProps}
              />
              <Field
                label="e-Money PIN"
                field="eMoneyPin"
                placeholder="6891"
                {...fieldProps}
              />
            </>
          ) : (
            <CashInfo>
              <span>💵</span>
              <p>
                The 'Cash on Delivery' option enables you to pay in cash when
                our delivery courier arrives at your residence. Just make sure
                your address is correct so that your order will not be
                cancelled.
              </p>
            </CashInfo>
          )}
        </Form>

        <Summary>
          <h3>SUMMARY</h3>

          {state.cart.length === 0 && (
            <p style={{ marginBottom: 24, color: "#777" }}>
              Your cart is empty
            </p>
          )}

          {state.cart.map((item) => (
            <Item key={item.id}>
              <div className="image">
                <ProductImage slug={item.slug} height={64} />
              </div>
              <div className="info">
                {item.name.replace(" Headphones", "").replace(" Speaker", "")}
                <p>$ {item.price}</p>
              </div>
              <span className="qty">x{item.qty}</span>
            </Item>
          ))}

          <Line>
            Total <b>$ {total}</b>
          </Line>
          <Line>
            Shipping <b>$ {shipping}</b>
          </Line>
          <Line>
            VAT (included) <b>$ {vat}</b>
          </Line>
          <Grand>
            Grand total <b>$ {grandTotal}</b>
          </Grand>

          <Button type="submit" form="checkout-form" style={{ width: "100%" }}>
            Continue
          </Button>
        </Summary>
      </Layout>

      {state.orderDone && (
        <Overlay>
          <Done>
            <h2>THANK YOU FOR YOUR ORDER</h2>
            <p style={{ margin: "16px 0 24px", color: "#777" }}>
              You will receive an email confirmation shortly.
            </p>
            <Button
              style={{ width: "100%" }}
              onClick={() => {
                dispatch({ type: "CLOSE_ORDER" });
                navigate("/");
              }}
            >
              Back to home
            </Button>
          </Done>
        </Overlay>
      )}
    </Page>
  );
}
