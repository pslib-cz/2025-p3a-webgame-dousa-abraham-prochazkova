using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAP.Server.Migrations
{
    /// <inheritdoc />
    public partial class ZonesAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Minigames");

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 4,
                column: "InteractionType",
                value: "phoneClicked");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Minigames",
                columns: table => new
                {
                    MinigameId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MinigameDesc = table.Column<string>(type: "TEXT", nullable: false),
                    MinigameName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Minigames", x => x.MinigameId);
                });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 4,
                column: "InteractionType",
                value: "nextScene");
        }
    }
}
