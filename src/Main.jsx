import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import * as yup from "yup";

export default function Main() {
    const errorHandler = (error, stackTrace) => {
        console.log(error);
    };

    const testSchema = {
        firstName: yup
            .string()
            .required("Name is required")
            .min(7, "Minimum 7 Character is Required"),
        lastName: yup.number().positive().integer().required(),
    };

    const schema = yup
        .object({
            firstName: yup.string().required(),
            age: yup.number().positive().integer().required(),
            test: yup.array().of(yup.object().shape(testSchema)),
        })
        .required();

    const {
        register,
        handleSubmit,
        control,
        reset,
        trigger,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            test: [{ firstName: "", lastName: "" }],
        },
        resolver: yupResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "test",
    });
    const onSubmit = (data) => console.log(data);

    // The following component is an example of your existing Input Component
    const Input = ({ label, register }) => (
        <>
            <label>{label}</label>
            <input {...register(label)} />
        </>
    );

    return (
        <ErrorBoundary onError={errorHandler}>
            <View style={styles.container}>
                {/* <VoiceRecording></VoiceRecording> */}
                {/* <CameraTest></CameraTest> */}
                {/* <Test></Test> */}
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <ul>
                        {fields.map((item, index) => (
                            <div key={item.id}>
                                <input {...register(`test.${index}.firstName`)} />
                                <p style={{ fontSize: 14 }}>
                                    {errors?.test?.[index]?.firstName?.message}
                                </p>
                                <Controller
                                    render={({ field }) => <input {...field} />}
                                    name={`test.${index}.lastName`}
                                    control={control}
                                />
                                <p style={{ fontSize: 14 }}>
                                    {errors?.test?.[index]?.lastName?.message}
                                </p>
                                <button type="button" onClick={() => remove(index)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </ul>
                    <button type="button" onClick={() => append({ firstName: "", lastName: "" })}>
                        append
                    </button>
                    <input type="submit" />
                </form>
            </View>
        </ErrorBoundary>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
