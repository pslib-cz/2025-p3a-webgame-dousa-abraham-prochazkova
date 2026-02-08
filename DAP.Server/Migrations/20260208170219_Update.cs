using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAP.Server.Migrations
{
    /// <inheritdoc />
    public partial class Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dialogues");

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 9,
                columns: new[] { "InteractionType", "TargetSceneId" },
                values: new object[] { "nextScene", 10 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dialogues",
                columns: table => new
                {
                    DialogueId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DialogueText = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dialogues", x => x.DialogueId);
                });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 9,
                columns: new[] { "InteractionType", "TargetSceneId" },
                values: new object[] { "getItem", null });
        }
    }
}
