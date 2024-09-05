export type ActiveCallback = (active: boolean) => void;
export type RegistrationFn = (callback: ActiveCallback) => (evt: MouseEvent) => void;
export function createActiveContext() {
    const createId = (function*() {
        let _id = 1000;
        while (true) {
            yield _id++;
        }
    })();

    const registrar = new Map<number, ActiveCallback>();

    const register = (callback: ActiveCallback) =>{
        const _id = createId.next().value;
        registrar.set(_id, callback);
        const _onclick = (evt: MouseEvent) => {
            registrar.forEach((setActive, id) =>{
                setActive(_id === id);
            })
        }
        return _onclick;
    }

    return register;
}

export type MarkerType = 'circle' | 'line';
