document.addEventListener('DOMContentLoaded', function () {
  const paymentIncreaseButton = document.querySelector('.payment-increase');
  const paymentDecreaseButton = document.querySelector('.payment-decrease');
  const creditTermSlider = document.getElementById('credit-term');
  const creditTermValue = document.getElementById('credit-term-value');
  const creditAmountValue = document.getElementById('credit-amount-value');
  const initialFeeSlider = document.getElementById('initial-fee');
  const initialFeeValue = document.getElementById('initial-fee-value');
  const monthlyPaymentElement = document.getElementById('monthly-payment');

  const minTerm = parseInt(creditTermSlider.min, 10);
  const maxTerm = parseInt(creditTermSlider.max, 10);

  // Входные данные для расчета
  const totalCreditAmount = 7070000; // Общая сумма кредита
  const initialFeePercentage = 50; // Начальный процент взноса
  const interestRate = 0.1; // Пример процентной ставки

  const updateValues = () => {
    // Обновление срока кредита
    creditTermValue.textContent = `${creditTermSlider.value} мес.`;

    // Расчет первоначального взноса
    const initialFeeAmount = Math.round((initialFeeSlider.value / 100) * totalCreditAmount);
    initialFeeValue.textContent = `${initialFeeAmount.toLocaleString()} ₽`;

    // Расчет ежемесячного платежа
    const remainingCredit = totalCreditAmount - initialFeeAmount;
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = parseInt(creditTermSlider.value, 10);
    const monthlyPayment = Math.round(
      (remainingCredit * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)),
    );
    monthlyPaymentElement.textContent = `${monthlyPayment.toLocaleString()} ₽`;
  };

  paymentIncreaseButton.addEventListener('click', () => {
    if (creditTermSlider.value < maxTerm) {
      creditTermSlider.value = parseInt(creditTermSlider.value, 10) + 1;
      updateValues();
    }
  });

  paymentDecreaseButton.addEventListener('click', () => {
    if (creditTermSlider.value > minTerm) {
      creditTermSlider.value = parseInt(creditTermSlider.value, 10) - 1;
      updateValues();
    }
  });

  creditTermSlider.addEventListener('input', updateValues);
  initialFeeSlider.addEventListener('input', updateValues);

  // Initialize values on page load
  updateValues();
});

// Скрипт для слайдера

document.querySelector('.toggle-button').addEventListener('click', function () {
  const optionsContainer = document.querySelector('.options-container');
  optionsContainer.classList.toggle('active');

  // Поворот стрелки при открытии/закрытии
  this.querySelector('.arrow-safety').style.transform = optionsContainer.classList.contains('active')
    ? 'rotate(180deg)'
    : 'rotate(0deg)';
});

document.addEventListener('DOMContentLoaded', function () {
  const comparisonCardsContainer = document.querySelector('.comparison-cards-container');
  const optionsRows = document.querySelectorAll('.options-row');

  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  const cardWidth = document.querySelector('.comparison-card').offsetWidth + 12; // Ширина карточки + отступ
  let currentPosition = 0;

  const totalItems = document.querySelectorAll('.comparison-card').length;
  const visibleItems = 4; // Количество видимых элементов

  const updateVisibleCards = (direction) => {
    const maxScroll = cardWidth * (totalItems - visibleItems);
    currentPosition += direction * cardWidth;

    if (currentPosition < 0) {
      currentPosition = 0;
    } else if (currentPosition > maxScroll) {
      currentPosition = maxScroll;
    }

    comparisonCardsContainer.style.transform = `translateX(-${currentPosition}px)`;

    optionsRows.forEach((row) => {
      row.style.transform = `translateX(-${currentPosition}px)`;
    });
  };

  leftArrow.addEventListener('click', () => updateVisibleCards(-1));
  rightArrow.addEventListener('click', () => updateVisibleCards(1));
});
