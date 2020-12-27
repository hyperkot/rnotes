import styled from 'styled-components';

/** Честно говоря декораторы - это плохой по ряду причин способ использовать
 *  styled-components, но выглядит круто) Вообще оборачивать хоки в декораторы весьма удобно */ 

export function css(strings: any, ...items: any[]): any {// ToDo: убрать any на что-то более точное
    return function (WrappedComponent: any) {
        return styled(WrappedComponent)(strings, ...items);
    };
}