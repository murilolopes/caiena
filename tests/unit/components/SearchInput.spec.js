import { mount } from "@vue/test-utils";
import SearchInput from "@/components/SearchInput.vue";

describe("SearchInput", () => {
  it("renders correctly", () => {
    const wrapper = mount(SearchInput);
    expect(wrapper.element).toMatchSnapshot();
  });
});
