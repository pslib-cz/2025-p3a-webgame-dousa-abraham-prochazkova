using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAP.Server.Migrations
{
    /// <inheritdoc />
    public partial class FinalScene : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 16,
                column: "InteractionType",
                value: "useItem");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 16,
                column: "InteractionType",
                value: "finalScene");
        }
    }
}
