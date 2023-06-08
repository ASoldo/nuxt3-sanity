export const question = {
  name: "question",
  type: "document",
  title: "Question",
  fields: [
    {
      name: "id",
      type: "number",
      title: "Id",
      readOnly: true,
      initialValue: () => {
        return Math.random();
      },
    },
    {
      name: "question_title",
      type: "string",
      title: "Question Title",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "question_title",
        maxLength: 96,
      },
    },
    {
      name: "questions",
      type: "array",
      of: [{ type: "string", title: "Question Variant" }],
      title: "Questions",
    },
    {
      name: "answer",
      type: "string",
      title: "Answer",
      validation: (Rule: any) => {
        return Rule.required().min(3).error("min 3 char");
      },
    },
    {
      name: "provided_text",
      type: "slug",
      title: "Provided Text",
      options: {
        source: "answer",
      },
      validation: (Rule: any) => {
        return Rule.required().error("Must have value here");
      },
    },
  ],
  validation: (Rule: any) => {
    return Rule.custom((fields: any) => {
      if (formatAnswer(fields.answer) !== fields.provided_text.current) {
        return "Answer and Provided Text must be the same. Please regenerate slug.";
      }

      return true; // Everything's fine
    });
  },
};

const formatAnswer = (answer: string) => {
  return answer.toLowerCase().replace(/ /g, "-");
};
