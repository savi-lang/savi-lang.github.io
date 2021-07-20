require "kramdown"
require "kramdown-parser-gfm"

module Savi
  class MarkdownConverter < Jekyll::Converters::Markdown
    safe false
    priority :highest

    def matches(ext)
      ext == ".md"
    end

    def output_ext(ext)
      ".html"
    end

    def setup
      return if @setup ||= false

      @cache = Jekyll::Cache.new("Savi::MarkdownConverter")
      @setup = true
    end

    def convert(content)
      setup

      @cache.getset(content) do
        rows = content.split("\n---\n").each_with_index.map { |row, index|
          Row.new(index).parse(row)
        }

        output = ""
        rows.each { |row|
          row.show_into(output)
          output << "\n"
        }

        output
      end
    end

    class Row
      def initialize(row_index)
        @row_index = row_index
        @text = []
        @blocks = []
      end

      def parse(content)
        content.scan(/^```([^\n]*)\n(.+?)\n```\n|((?:.(?!^```))+)/m) { |match|
          if match[0]
            @blocks << [match[0], match[1]]
          else
            @text << match[2]
          end
        }
        self
      end

      def show_into(output)
        output << <<~HTML
          <div class="row-reverse">
        HTML

        show_text_into(output)
        show_blocks_into(output)

        output << <<~HTML
          </div>
        HTML

        self
      end

      private

      def show_text_into(output)
        output << <<~HTML
          <div class="section-bottom section-right">
            <div class="content">
        HTML
        if @row_index > 0
          output << <<~HTML
            <hr>
          HTML
        end

        @text.each { |content| show_markdown_into(output, content) }

        output << <<~HTML
            </div>
          </div>
        HTML
      end

      def show_blocks_into(output)
        output << <<~HTML
          <div class="section-bottom section-mid">
            <div class="content">
        HTML

        @blocks.each { |kind, content|
          case kind
          when "html demo"
            show_html_demo_into(output, content)
          else
            show_markdown_into(output, "```#{kind}\n#{content}\n```")
          end
        }

        output << <<~HTML
            </div>
          </div>
        HTML
      end

      def show_markdown_into(output, content)
        output << "\n"
        output << Kramdown::Document.new(content, input: 'GFM').to_html
      end

      def show_html_demo_into(output, content)
        output << <<~HTML
          <div class="demo">
        HTML
        output << content
        output << <<~HTML
          </div>
        HTML
      end
    end
  end
end