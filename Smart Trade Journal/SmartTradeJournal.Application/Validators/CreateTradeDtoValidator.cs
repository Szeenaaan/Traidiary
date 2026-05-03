using FluentValidation;
using SmartTradeJournal.Application.DTOs;

namespace SmartTradeJournal.Application.Validators;

public class CreateTradeDtoValidator : AbstractValidator<CreateTradeDto>
{
    public CreateTradeDtoValidator()
    {
        RuleFor(x => x.EntryPrice)
            .GreaterThan(0)
            .WithMessage("Entry price must be greater than 0");

        RuleFor(x => x.ExitPrice)
            .GreaterThan(0)
            .WithMessage("Exit price must be greater than 0");

        RuleFor(x => x.LotSize)
            .GreaterThan(0)
            .WithMessage("Lot size must be greater than 0");

        RuleFor(x => x.Strategy)
            .NotEmpty()
            .WithMessage("Strategy is required")
            .MaximumLength(50)
            .WithMessage("Strategy must not exceed 50 characters");
    }
}