import { useFormContext } from "react-hook-form";

const InputField = ({ label, name, type = "text", placeholder, validation }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="mb-4">
            <label className="block font-medium">{label}</label>
            <input
                type={type}
                {...register(name, validation)}
                placeholder={placeholder}
                className="w-full p-2 border rounded"
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
        </div>
    );
};

export default InputField;
