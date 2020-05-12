import $ from 'jquery';

export const oops = () => {
    const fragment = $(new DocumentFragment());

    const h1= $('<h1>Oops</h1>')
    const p = $('<p>Go back!</p>')

    fragment.append(h1).append(p)

    return fragment;
}