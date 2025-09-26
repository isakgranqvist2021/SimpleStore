'use client';

import { ProductOption } from 'database/product-option/product-option.model';
import { useContinueToPayment } from 'hooks/use-continue-to-payment';
import React from 'react';

interface PickProductOptionsProps {
  options: ProductOption[];
  email?: string;
  productId: string;
}

export function PickProductOptions(props: PickProductOptionsProps) {
  const [state, setState] = React.useState<Record<string, string>>({});

  const { isLoading, continueToPayment } = useContinueToPayment(
    props.productId,
  );

  return (
    <React.Fragment>
      {props.options.map((option) => {
        const value = state[option.id] || '';

        const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (
          e,
        ) => {
          setState((prev) => ({
            ...prev,
            [option.id]: e.target.value,
          }));
        };

        return (
          <fieldset className="fieldset" key={option.id}>
            <legend className="fieldset-legend">{option.name}</legend>
            <select
              className="select w-full"
              value={value}
              onChange={handleChange}
            >
              {option.values.map((value) => (
                <option disabled={option.disabled} key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </fieldset>
        );
      })}

      <button
        className="btn btn-primary"
        onClick={() => continueToPayment(state)}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Buy now'}
      </button>
    </React.Fragment>
  );
}
