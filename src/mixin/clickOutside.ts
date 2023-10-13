// clickOutside.ts
import { DirectiveBinding } from 'vue';

const clickOutside = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const onClick = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value();
      }
    };

    document.addEventListener('click', onClick);
    //@ts-ignore
    el._clickOutsideEvent = onClick;
  },
  beforeUnmount(el: HTMLElement) {
    //@ts-ignore
    document.removeEventListener('click', el._clickOutsideEvent);
    //@ts-ignore
    delete el._clickOutsideEvent;
  },
};

export default clickOutside;