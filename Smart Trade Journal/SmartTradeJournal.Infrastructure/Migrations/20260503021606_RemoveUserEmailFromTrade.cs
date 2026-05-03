using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartTradeJournal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUserEmailFromTrade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "Trades");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "Trades",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
