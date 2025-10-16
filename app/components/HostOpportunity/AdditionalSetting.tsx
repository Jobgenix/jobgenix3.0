/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ToggleSwitch from "./ToggleSwitch";

type Referral = {
  firstName: string;
  lastName: string;
  designation: string;
  mail: string;
  linkedin: string;
};

type FormValues = {
  referrals: Referral[];
};

export default function AdditionalSetting({
  onChange,
}: {
  onChange?: (data: any) => void;
}) {
  const [addReferPerson, setAddReferPerson] = useState(false);

  // Initialize form
  const { control, register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      referrals: [
        {
          firstName: "",
          lastName: "",
          designation: "",
          mail: "",
          linkedin: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "referrals",
  });

  // Watch form data in real-time
  const addReferrals = watch("referrals");

  useEffect(() => {
    onChange?.({
      addReferPerson,
      addReferrals,
    });
  }, [addReferPerson, addReferrals, onChange]);

  const onSubmit = (data: FormValues) => {
    console.log("All referrals:", data.referrals);
  };

  return (
    <>
      <div>
        <ToggleSwitch
          label="Add a Refer Person"
          initialState={addReferPerson}
          onChange={(state: boolean) => {
            setAddReferPerson(state);
            // Reset the form when toggled
            if (state) {
              // If turning ON, reset to one empty referral
              control._reset({
                referrals: [
                  {
                    firstName: "",
                    lastName: "",
                    designation: "",
                    mail: "",
                    linkedin: "",
                  },
                ],
              });
            } else {
              // If turning OFF, reset to one empty referral
              control._reset({
                referrals: [
                  {
                    firstName: "",
                    lastName: "",
                    designation: "",
                    mail: "",
                    linkedin: "",
                  },
                ],
              });
            }
          }}
          className="mt-0 card-shadow px-5 sm:px-7 py-4 h-auto sm:h-[4.7rem] rounded-2xl text-base font-montserrat sm:text-xl font-medium gap-2"
        />
      </div>

      {addReferPerson && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-white shadow-md rounded-2xl p-8 w-full space-y-6"
            >
              {/* Name + Gender */}
              <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-gray-700 text-sm md:text-lg font-semibold">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      {...register(`referrals.${index}.firstName`, {
                        required: true,
                      })}
                      placeholder="First Name"
                      className="w-1/2 border border-blue-400 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      {...register(`referrals.${index}.lastName`, {
                        required: true,
                      })}
                      placeholder="Last Name"
                      className="w-1/2 border border-blue-400 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Designation + Mail */}
              <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-gray-700 text-sm md:text-lg font-semibold">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register(`referrals.${index}.designation`, {
                      required: true,
                    })}
                    placeholder="Software Engineer"
                    className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-gray-700 text-sm md:text-lg font-semibold">
                    Mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register(`referrals.${index}.mail`)}
                    placeholder="example@gmail.com"
                    className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="block mb-1 text-gray-700 text-sm md:text-lg font-semibold">
                  LinkedIn URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  {...register(`referrals.${index}.linkedin`, {
                    required: true,
                  })}
                  placeholder="https://www.linkedin.com/in/yourprofile"
                  className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-600 text-white p-2 rounded-full px-3"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-left flex gap-4">
            <button
              type="button"
              onClick={() =>
                append({
                  firstName: "",
                  lastName: "",
                  designation: "",
                  mail: "",
                  linkedin: "",
                })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6 py-2 transition"
            >
              Add Another
            </button>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-full px-6 py-2 transition"
            >
              Save Referrals
            </button>
          </div>
        </form>
      )}
    </>
  );
}
