import { useFormContext } from "react-hook-form";

const TextAreaField = ({ label, name, placeholder, validation, rows=4 }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="mb-4">
            <label className="block font-medium mb-1">{label}</label>
            <textarea
                {...register(name, validation)}
                placeholder={placeholder}
                rows={rows}
                className="w-full p-2 border rounded resize-none min-h-[100px]"
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
        </div>
    );
};

export default TextAreaField;
