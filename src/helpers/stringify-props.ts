export type StringifyObject<Type extends Object> = {
    [Key in keyof Type]: string
};

const stringifyProps = <Type extends Object>(object: Type): StringifyObject<Type> => {
    const objectLikeArray = Object.entries(object);

    const objectWithPropsStringified = objectLikeArray
        .reduce<Partial<StringifyObject<Type>>>((prevObj, [key, value]) => ({
            ...prevObj,
            [key]: String(value),
        }), {});

    return objectWithPropsStringified as StringifyObject<Type>;
};

export default stringifyProps;
