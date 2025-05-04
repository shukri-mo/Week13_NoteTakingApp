// TODO: Import useForm, zodResolver, axios, useNavigate, useState, and noteSchema
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { noteSchema } from "../schema/notes";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Save } from "lucide-react";
import { array } from "zod";

const CreateNoteForm = () => {
  // TODO: Setup isSubmitting state with useState
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const maxLength = 500;
  // TODO: create navigate variable and set to useNavigate()
  const navigate = useNavigate();
  // TODO: Set up the form with useForm from react-hook-form and zodResolver from @hookform/resolvers/zod
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(noteSchema) });
  const sendToTheServer = async (data) => {
    // TODO: Send the data to the server
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/notes",
        data
      );
      console.log("note created", response.data);
      navigate("/notes");
    } catch (error) {
      console.error("failed to create a not", error);
    } finally {
      setIsSubmitting(false);
    }
    // TODO: Use axios to create a new note in the server using the endpoint http://localhost:3001/api/notes

    reset({
      content: "",
      title: "",
    });
  };
  const handleContentChange = (value) => {
    console.log("content changed", value);
    setContent(value);
    const plainText = value.replace(/<[^>]+>/g, "");
    setCharacterCount(plainText.length);
  };
  return (
    <>
      <h1 className="text-center font-bold mb-4">Create a New Note</h1>
      {/* TODO: Setup the form with TailwindCSS, create a form with the following fields: title, content, and submit button */}

      <form
        action=""
        onSubmit={handleSubmit(sendToTheServer)}
        className="bg-white w-full p-4"
      >
        <div className="px-10">
          <label className="">Title</label> <br />
          <input
            type="text"
            name=""
            id=""
            {...register("title")}
            className="my-2 border border-gray-400 outline-none px-4 py-2 rounded w-full focus:border-yellow-500"
          />
          {errors.title && (
            <p className="text-red-400">{errors.title.message}</p>
          )}
          <br />
        </div>
        <label htmlFor="" className="m-8 pt">
          Content
        </label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <div>
              {/* ReactQuill for getting rich text */}
              <ReactQuill
                {...field}
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  handleContentChange(val);
                }}
                className="border-gray-300 rounded-lg mt-2 px-5 w-full focus:outline-none"
                style={{ color: "inherit" }}
              />
            </div>
          )}
        />

        {content && (
          <div style={{ textAlign: "right" }}>
            {content.length} / {maxLength} characters
          </div>
        )}
        {errors.content && <p>{errors.content.message}</p>}
        <button
          type="submit"
          className="bg-yellow-600 text-white  text-center rounded-lg w-full mt-4 p-2"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateNoteForm;
