import { FileHelper } from "@supernovaio/export-helpers"
import { Supernova, PulsarContext, RemoteVersionIdentifier, AnyOutputFile, TokenType, ColorToken } from "@supernovaio/sdk-exporters"
import { ExporterConfiguration } from "../config"
import { colorTokenToCSS } from "./content/token"

/**
 * Export entrypoint.
 * When running `export` through extensions or pipelines, this function will be called.
 * Context contains information about the design system and version that is currently being exported.
 */
Pulsar.export(async (sdk: Supernova, context: PulsarContext): Promise<Array<AnyOutputFile>> => {
  // Fetch data from design system that is currently being exported (context)
  const remoteVersionIdentifier: RemoteVersionIdentifier = {
    designSystemId: context.dsId,
    versionId: context.versionId,
  }

  // Fetch the necessary data
  let tokens = await sdk.tokens.getTokens(remoteVersionIdentifier)
  let tokenGroups = await sdk.tokens.getTokenGroups(remoteVersionIdentifier)

  // Filter by brand, if specified by the VSCode extension or pipeline configuration
  if (context.brandId) {
    tokens = tokens.filter((token) => token.brandId === context.brandId)
    tokenGroups = tokenGroups.filter((tokenGroup) => tokenGroup.brandId === context.brandId)
  }

  // Apply theme, if specified by the VSCode extension or pipeline configuration
  if (context.themeId) {
    const themes = await sdk.tokens.getTokenThemes(remoteVersionIdentifier)
    const theme = themes.find((theme) => theme.id === context.themeId)
    if (theme) {
      tokens = await sdk.tokens.computeTokensByApplyingThemes(tokens, [theme])
    } else {
      // Don't allow applying theme which doesn't exist in the system
      throw new Error("Unable to apply theme which doesn't exist in the system.")
    }
  }

  // Convert all color tokens to CSS variables
  const mappedTokens = new Map(tokens.map((token) => [token.id, token]))
  const cssVariables = tokens
    .filter((t) => t.tokenType === TokenType.color)
    .map((token) => colorTokenToCSS(token as ColorToken, mappedTokens, tokenGroups))
    .join("\n")

  // Create CSS file content
  let content = `:root {\n${cssVariables}\n}`
  if (exportConfiguration.generateDisclaimer) {
    // Add disclaimer to every file if enabled
    content = `/* This file was generated by Supernova, don't change by hand */\n${content}`
  }

  // Create output file and return it
  return [
    FileHelper.createTextFile({
      relativePath: "./",
      fileName: "colors.css",
      content: content,
    }),
  ]
})

/** Exporter configuration. Adheres to the `ExporterConfiguration` interface and its content comes from the resolved default configuration + user overrides of various configuration keys */
export const exportConfiguration = Pulsar.exportConfig<ExporterConfiguration>()
