import focus from "@alpinejs/focus";
import Alpine from "alpinejs";
import "./main.css";

function calculator() {
  return {
    socialSecurity: false,
    socialSecuritySalary: 0,
    minimumSocialSecuritySalary: 750_000,
    socialSecurityRate: 0.07,
    salary: 837_000,
    minimumSalary: 837_000,
    roundMethod: "ceil" /* "ceil", "floor", "round" */,
    roundToNearest: 100,
    result: 0,
    brackets: [
      { min: 0, max: 837_000, rate: 0 },
      { min: 837_001, max: 850_000, rate: 0.11 },
      { min: 850_001, max: 1_100_000, rate: 0.13 },
      { min: 1_100_001, max: 50_000_000, rate: 0.15 },
    ],
    init() {
      this.socialSecuritySalary = this.minimumSocialSecuritySalary;
    },
    reset() {
      this.socialSecurity = false;
      this.socialSecuritySalary = this.minimumSocialSecuritySalary;
      this.salary = this.minimumSalary;
      this.result = 0;
    },
    roundTo(amount) {
      return Math[this.roundMethod](amount / this.roundToNearest) * this.roundToNearest;
    },
    checkSalary() {
      return this.salary >= this.minimumSalary;
    },
    checkSSSalary() {
      return this.socialSecuritySalary >= this.minimumSocialSecuritySalary
    },
    allValid() {
      return this.checkSalary() && this.checkSSSalary();
    },
    calculateSalary() {
      if (this.socialSecurity) {
        return this.salary - this.socialSecurityRate * this.socialSecuritySalary;
      }
      return this.salary;
    },
    calculate() {
      let tax = 0;
      let salary = this.calculateSalary();
      for (const bracket of this.brackets) {
        if (bracket.min <= salary && salary <= bracket.max) {
          let bracketTax = bracket.rate * (salary - bracket.min);
          tax += bracketTax;
          this.result = this.roundTo(tax);
          return;
        } else {
          tax += (bracket.max - bracket.min) * bracket.rate;
        }
      }
    },
  };
}

window.Alpine = Alpine;

Alpine.plugin(focus);
Alpine.data("calculator", calculator);

Alpine.start();
