#!/usr/bin/env node

// cli/index.mjs
import { readFile as readFile6 } from "node:fs/promises";
import path7 from "node:path";
import { randomUUID as randomUUID3 } from "node:crypto";

// cli/files.mjs
import { createHash } from "node:crypto";
import { lstat, open, readFile, realpath } from "node:fs/promises";
import path from "node:path";

// node_modules/parse5/dist/common/unicode.js
var UNDEFINED_CODE_POINTS = /* @__PURE__ */ new Set([
  65534,
  65535,
  131070,
  131071,
  196606,
  196607,
  262142,
  262143,
  327678,
  327679,
  393214,
  393215,
  458750,
  458751,
  524286,
  524287,
  589822,
  589823,
  655358,
  655359,
  720894,
  720895,
  786430,
  786431,
  851966,
  851967,
  917502,
  917503,
  983038,
  983039,
  1048574,
  1048575,
  1114110,
  1114111
]), REPLACEMENT_CHARACTER = "�", CODE_POINTS;
(function(CODE_POINTS2) {
  CODE_POINTS2[CODE_POINTS2.EOF = -1] = "EOF", CODE_POINTS2[CODE_POINTS2.NULL = 0] = "NULL", CODE_POINTS2[CODE_POINTS2.TABULATION = 9] = "TABULATION", CODE_POINTS2[CODE_POINTS2.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", CODE_POINTS2[CODE_POINTS2.LINE_FEED = 10] = "LINE_FEED", CODE_POINTS2[CODE_POINTS2.FORM_FEED = 12] = "FORM_FEED", CODE_POINTS2[CODE_POINTS2.SPACE = 32] = "SPACE", CODE_POINTS2[CODE_POINTS2.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", CODE_POINTS2[CODE_POINTS2.QUOTATION_MARK = 34] = "QUOTATION_MARK", CODE_POINTS2[CODE_POINTS2.AMPERSAND = 38] = "AMPERSAND", CODE_POINTS2[CODE_POINTS2.APOSTROPHE = 39] = "APOSTROPHE", CODE_POINTS2[CODE_POINTS2.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", CODE_POINTS2[CODE_POINTS2.SOLIDUS = 47] = "SOLIDUS", CODE_POINTS2[CODE_POINTS2.DIGIT_0 = 48] = "DIGIT_0", CODE_POINTS2[CODE_POINTS2.DIGIT_9 = 57] = "DIGIT_9", CODE_POINTS2[CODE_POINTS2.SEMICOLON = 59] = "SEMICOLON", CODE_POINTS2[CODE_POINTS2.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", CODE_POINTS2[CODE_POINTS2.EQUALS_SIGN = 61] = "EQUALS_SIGN", CODE_POINTS2[CODE_POINTS2.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", CODE_POINTS2[CODE_POINTS2.QUESTION_MARK = 63] = "QUESTION_MARK", CODE_POINTS2[CODE_POINTS2.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", CODE_POINTS2[CODE_POINTS2.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", CODE_POINTS2[CODE_POINTS2.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", CODE_POINTS2[CODE_POINTS2.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", CODE_POINTS2[CODE_POINTS2.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", CODE_POINTS2[CODE_POINTS2.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z";
})(CODE_POINTS || (CODE_POINTS = {}));
var SEQUENCES = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function isSurrogate(cp) {
  return cp >= 55296 && cp <= 57343;
}
function isSurrogatePair(cp) {
  return cp >= 56320 && cp <= 57343;
}
function getSurrogatePairCodePoint(cp1, cp2) {
  return (cp1 - 55296) * 1024 + 9216 + cp2;
}
function isControlCodePoint(cp) {
  return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
}
function isUndefinedCodePoint(cp) {
  return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
}

// node_modules/parse5/dist/common/error-codes.js
var ERR;
(function(ERR2) {
  ERR2.controlCharacterInInputStream = "control-character-in-input-stream", ERR2.noncharacterInInputStream = "noncharacter-in-input-stream", ERR2.surrogateInInputStream = "surrogate-in-input-stream", ERR2.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", ERR2.endTagWithAttributes = "end-tag-with-attributes", ERR2.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", ERR2.unexpectedSolidusInTag = "unexpected-solidus-in-tag", ERR2.unexpectedNullCharacter = "unexpected-null-character", ERR2.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", ERR2.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", ERR2.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", ERR2.missingEndTagName = "missing-end-tag-name", ERR2.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", ERR2.unknownNamedCharacterReference = "unknown-named-character-reference", ERR2.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", ERR2.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", ERR2.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", ERR2.eofBeforeTagName = "eof-before-tag-name", ERR2.eofInTag = "eof-in-tag", ERR2.missingAttributeValue = "missing-attribute-value", ERR2.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", ERR2.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", ERR2.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", ERR2.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", ERR2.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", ERR2.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", ERR2.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", ERR2.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", ERR2.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", ERR2.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", ERR2.cdataInHtmlContent = "cdata-in-html-content", ERR2.incorrectlyOpenedComment = "incorrectly-opened-comment", ERR2.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", ERR2.eofInDoctype = "eof-in-doctype", ERR2.nestedComment = "nested-comment", ERR2.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", ERR2.eofInComment = "eof-in-comment", ERR2.incorrectlyClosedComment = "incorrectly-closed-comment", ERR2.eofInCdata = "eof-in-cdata", ERR2.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", ERR2.nullCharacterReference = "null-character-reference", ERR2.surrogateCharacterReference = "surrogate-character-reference", ERR2.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", ERR2.controlCharacterReference = "control-character-reference", ERR2.noncharacterCharacterReference = "noncharacter-character-reference", ERR2.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", ERR2.missingDoctypeName = "missing-doctype-name", ERR2.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", ERR2.duplicateAttribute = "duplicate-attribute", ERR2.nonConformingDoctype = "non-conforming-doctype", ERR2.missingDoctype = "missing-doctype", ERR2.misplacedDoctype = "misplaced-doctype", ERR2.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", ERR2.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", ERR2.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", ERR2.openElementsLeftAfterEof = "open-elements-left-after-eof", ERR2.abandonedHeadElementChild = "abandoned-head-element-child", ERR2.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", ERR2.nestedNoscriptInHead = "nested-noscript-in-head", ERR2.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(ERR || (ERR = {}));

// node_modules/parse5/dist/tokenizer/preprocessor.js
var DEFAULT_BUFFER_WATERLINE = 65536, Preprocessor = class {
  constructor(handler) {
    this.handler = handler, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = DEFAULT_BUFFER_WATERLINE, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(code, cpOffset) {
    let { line, col, offset } = this, startCol = col + cpOffset, startOffset = offset + cpOffset;
    return {
      code,
      startLine: line,
      endLine: line,
      startCol,
      endCol: startCol,
      startOffset,
      endOffset: startOffset
    };
  }
  _err(code) {
    this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(code, 0)));
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
  }
  _processSurrogate(cp) {
    if (this.pos !== this.html.length - 1) {
      let nextCp = this.html.charCodeAt(this.pos + 1);
      if (isSurrogatePair(nextCp))
        return this.pos++, this._addGap(), getSurrogatePairCodePoint(cp, nextCp);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, CODE_POINTS.EOF;
    return this._err(ERR.surrogateInInputStream), cp;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
  }
  write(chunk, isLastChunk) {
    this.html.length > 0 ? this.html += chunk : this.html = chunk, this.endOfChunkHit = !1, this.lastChunkWritten = isLastChunk;
  }
  insertHtmlAtCurrentPos(chunk) {
    this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
  }
  startsWith(pattern, caseSensitive) {
    if (this.pos + pattern.length > this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, !1;
    if (caseSensitive)
      return this.html.startsWith(pattern, this.pos);
    for (let i = 0; i < pattern.length; i++)
      if ((this.html.charCodeAt(this.pos + i) | 32) !== pattern.charCodeAt(i))
        return !1;
    return !0;
  }
  peek(offset) {
    let pos = this.pos + offset;
    if (pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, CODE_POINTS.EOF;
    let code = this.html.charCodeAt(pos);
    return code === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, CODE_POINTS.EOF;
    let cp = this.html.charCodeAt(this.pos);
    return cp === CODE_POINTS.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, CODE_POINTS.LINE_FEED) : cp === CODE_POINTS.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, isSurrogate(cp) && (cp = this._processSurrogate(cp)), this.handler.onParseError === null || cp > 31 && cp < 127 || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976 || this._checkForProblematicCharacters(cp), cp);
  }
  _checkForProblematicCharacters(cp) {
    isControlCodePoint(cp) ? this._err(ERR.controlCharacterInInputStream) : isUndefinedCodePoint(cp) && this._err(ERR.noncharacterInInputStream);
  }
  retreat(count) {
    for (this.pos -= count; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
};

// node_modules/parse5/dist/common/token.js
var TokenType;
(function(TokenType2) {
  TokenType2[TokenType2.CHARACTER = 0] = "CHARACTER", TokenType2[TokenType2.NULL_CHARACTER = 1] = "NULL_CHARACTER", TokenType2[TokenType2.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", TokenType2[TokenType2.START_TAG = 3] = "START_TAG", TokenType2[TokenType2.END_TAG = 4] = "END_TAG", TokenType2[TokenType2.COMMENT = 5] = "COMMENT", TokenType2[TokenType2.DOCTYPE = 6] = "DOCTYPE", TokenType2[TokenType2.EOF = 7] = "EOF", TokenType2[TokenType2.HIBERNATION = 8] = "HIBERNATION";
})(TokenType || (TokenType = {}));
function getTokenAttr(token, attrName) {
  for (let i = token.attrs.length - 1; i >= 0; i--)
    if (token.attrs[i].name === attrName)
      return token.attrs[i].value;
  return null;
}

// node_modules/entities/dist/esm/generated/decode-data-html.js
var htmlDecodeTree = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ 'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((c) => c.charCodeAt(0))
);

// node_modules/entities/dist/esm/decode-codepoint.js
var _a, decodeMap = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), fromCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, n/no-unsupported-features/es-builtins
  (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
    let output = "";
    return codePoint > 65535 && (codePoint -= 65536, output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296), codePoint = 56320 | codePoint & 1023), output += String.fromCharCode(codePoint), output;
  }
);
function replaceCodePoint(codePoint) {
  var _a2;
  return codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111 ? 65533 : (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
}

// node_modules/entities/dist/esm/decode.js
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2.NUM = 35] = "NUM", CharCodes2[CharCodes2.SEMI = 59] = "SEMI", CharCodes2[CharCodes2.EQUALS = 61] = "EQUALS", CharCodes2[CharCodes2.ZERO = 48] = "ZERO", CharCodes2[CharCodes2.NINE = 57] = "NINE", CharCodes2[CharCodes2.LOWER_A = 97] = "LOWER_A", CharCodes2[CharCodes2.LOWER_F = 102] = "LOWER_F", CharCodes2[CharCodes2.LOWER_X = 120] = "LOWER_X", CharCodes2[CharCodes2.LOWER_Z = 122] = "LOWER_Z", CharCodes2[CharCodes2.UPPER_A = 65] = "UPPER_A", CharCodes2[CharCodes2.UPPER_F = 70] = "UPPER_F", CharCodes2[CharCodes2.UPPER_Z = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
var TO_LOWER_BIT = 32, BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2.VALUE_LENGTH = 49152] = "VALUE_LENGTH", BinTrieFlags2[BinTrieFlags2.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", BinTrieFlags2[BinTrieFlags2.JUMP_TABLE = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
  return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
}
function isEntityInAttributeInvalidEnd(code) {
  return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2.EntityStart = 0] = "EntityStart", EntityDecoderState2[EntityDecoderState2.NumericStart = 1] = "NumericStart", EntityDecoderState2[EntityDecoderState2.NumericDecimal = 2] = "NumericDecimal", EntityDecoderState2[EntityDecoderState2.NumericHex = 3] = "NumericHex", EntityDecoderState2[EntityDecoderState2.NamedEntity = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2.Legacy = 0] = "Legacy", DecodingMode2[DecodingMode2.Strict = 1] = "Strict", DecodingMode2[DecodingMode2.Attribute = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
var EntityDecoder = class {
  constructor(decodeTree, emitCodePoint, errors) {
    this.decodeTree = decodeTree, this.emitCodePoint = emitCodePoint, this.errors = errors, this.state = EntityDecoderState.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = DecodingMode.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode, this.state = EntityDecoderState.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(input, offset) {
    switch (this.state) {
      case EntityDecoderState.EntityStart:
        return input.charCodeAt(offset) === CharCodes.NUM ? (this.state = EntityDecoderState.NumericStart, this.consumed += 1, this.stateNumericStart(input, offset + 1)) : (this.state = EntityDecoderState.NamedEntity, this.stateNamedEntity(input, offset));
      case EntityDecoderState.NumericStart:
        return this.stateNumericStart(input, offset);
      case EntityDecoderState.NumericDecimal:
        return this.stateNumericDecimal(input, offset);
      case EntityDecoderState.NumericHex:
        return this.stateNumericHex(input, offset);
      case EntityDecoderState.NamedEntity:
        return this.stateNamedEntity(input, offset);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(input, offset) {
    return offset >= input.length ? -1 : (input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X ? (this.state = EntityDecoderState.NumericHex, this.consumed += 1, this.stateNumericHex(input, offset + 1)) : (this.state = EntityDecoderState.NumericDecimal, this.stateNumericDecimal(input, offset));
  }
  addToNumericResult(input, start, end, base) {
    if (start !== end) {
      let digitCount = end - start;
      this.result = this.result * Math.pow(base, digitCount) + Number.parseInt(input.substr(start, digitCount), base), this.consumed += digitCount;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(input, offset) {
    let startIndex = offset;
    for (; offset < input.length; ) {
      let char = input.charCodeAt(offset);
      if (isNumber(char) || isHexadecimalCharacter(char))
        offset += 1;
      else
        return this.addToNumericResult(input, startIndex, offset, 16), this.emitNumericEntity(char, 3);
    }
    return this.addToNumericResult(input, startIndex, offset, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(input, offset) {
    let startIndex = offset;
    for (; offset < input.length; ) {
      let char = input.charCodeAt(offset);
      if (isNumber(char))
        offset += 1;
      else
        return this.addToNumericResult(input, startIndex, offset, 10), this.emitNumericEntity(char, 2);
    }
    return this.addToNumericResult(input, startIndex, offset, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a2;
    if (this.consumed <= expectedLength)
      return (_a2 = this.errors) === null || _a2 === void 0 || _a2.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (lastCp === CharCodes.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === DecodingMode.Strict)
      return 0;
    return this.emitCodePoint(replaceCodePoint(this.result), this.consumed), this.errors && (lastCp !== CharCodes.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(input, offset) {
    let { decodeTree } = this, current = decodeTree[this.treeIndex], valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; offset < input.length; offset++, this.excess++) {
      let char = input.charCodeAt(offset);
      if (this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
        (valueLength === 0 || // And there should be no invalid characters.
        isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (current = decodeTree[this.treeIndex], valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14, valueLength !== 0) {
        if (char === CharCodes.SEMI)
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        this.decodeMode !== DecodingMode.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a2;
    let { result, decodeTree } = this, valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(result, valueLength, this.consumed), (_a2 = this.errors) === null || _a2 === void 0 || _a2.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result, valueLength, consumed) {
    let { decodeTree } = this;
    return this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed), valueLength === 3 && this.emitCodePoint(decodeTree[result + 2], consumed), consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var _a2;
    switch (this.state) {
      case EntityDecoderState.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case EntityDecoderState.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case EntityDecoderState.NumericHex:
        return this.emitNumericEntity(0, 3);
      case EntityDecoderState.NumericStart:
        return (_a2 = this.errors) === null || _a2 === void 0 || _a2.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case EntityDecoderState.EntityStart:
        return 0;
    }
  }
};
function determineBranch(decodeTree, current, nodeIndex, char) {
  let branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7, jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0)
    return jumpOffset !== 0 && char === jumpOffset ? nodeIndex : -1;
  if (jumpOffset) {
    let value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIndex + value] - 1;
  }
  let lo = nodeIndex, hi = lo + branchCount - 1;
  for (; lo <= hi; ) {
    let mid = lo + hi >>> 1, midValue = decodeTree[mid];
    if (midValue < char)
      lo = mid + 1;
    else if (midValue > char)
      hi = mid - 1;
    else
      return decodeTree[mid + branchCount];
  }
  return -1;
}

// node_modules/parse5/dist/common/html.js
var NS;
(function(NS2) {
  NS2.HTML = "http://www.w3.org/1999/xhtml", NS2.MATHML = "http://www.w3.org/1998/Math/MathML", NS2.SVG = "http://www.w3.org/2000/svg", NS2.XLINK = "http://www.w3.org/1999/xlink", NS2.XML = "http://www.w3.org/XML/1998/namespace", NS2.XMLNS = "http://www.w3.org/2000/xmlns/";
})(NS || (NS = {}));
var ATTRS;
(function(ATTRS2) {
  ATTRS2.TYPE = "type", ATTRS2.ACTION = "action", ATTRS2.ENCODING = "encoding", ATTRS2.PROMPT = "prompt", ATTRS2.NAME = "name", ATTRS2.COLOR = "color", ATTRS2.FACE = "face", ATTRS2.SIZE = "size";
})(ATTRS || (ATTRS = {}));
var DOCUMENT_MODE;
(function(DOCUMENT_MODE2) {
  DOCUMENT_MODE2.NO_QUIRKS = "no-quirks", DOCUMENT_MODE2.QUIRKS = "quirks", DOCUMENT_MODE2.LIMITED_QUIRKS = "limited-quirks";
})(DOCUMENT_MODE || (DOCUMENT_MODE = {}));
var TAG_NAMES;
(function(TAG_NAMES2) {
  TAG_NAMES2.A = "a", TAG_NAMES2.ADDRESS = "address", TAG_NAMES2.ANNOTATION_XML = "annotation-xml", TAG_NAMES2.APPLET = "applet", TAG_NAMES2.AREA = "area", TAG_NAMES2.ARTICLE = "article", TAG_NAMES2.ASIDE = "aside", TAG_NAMES2.B = "b", TAG_NAMES2.BASE = "base", TAG_NAMES2.BASEFONT = "basefont", TAG_NAMES2.BGSOUND = "bgsound", TAG_NAMES2.BIG = "big", TAG_NAMES2.BLOCKQUOTE = "blockquote", TAG_NAMES2.BODY = "body", TAG_NAMES2.BR = "br", TAG_NAMES2.BUTTON = "button", TAG_NAMES2.CAPTION = "caption", TAG_NAMES2.CENTER = "center", TAG_NAMES2.CODE = "code", TAG_NAMES2.COL = "col", TAG_NAMES2.COLGROUP = "colgroup", TAG_NAMES2.DD = "dd", TAG_NAMES2.DESC = "desc", TAG_NAMES2.DETAILS = "details", TAG_NAMES2.DIALOG = "dialog", TAG_NAMES2.DIR = "dir", TAG_NAMES2.DIV = "div", TAG_NAMES2.DL = "dl", TAG_NAMES2.DT = "dt", TAG_NAMES2.EM = "em", TAG_NAMES2.EMBED = "embed", TAG_NAMES2.FIELDSET = "fieldset", TAG_NAMES2.FIGCAPTION = "figcaption", TAG_NAMES2.FIGURE = "figure", TAG_NAMES2.FONT = "font", TAG_NAMES2.FOOTER = "footer", TAG_NAMES2.FOREIGN_OBJECT = "foreignObject", TAG_NAMES2.FORM = "form", TAG_NAMES2.FRAME = "frame", TAG_NAMES2.FRAMESET = "frameset", TAG_NAMES2.H1 = "h1", TAG_NAMES2.H2 = "h2", TAG_NAMES2.H3 = "h3", TAG_NAMES2.H4 = "h4", TAG_NAMES2.H5 = "h5", TAG_NAMES2.H6 = "h6", TAG_NAMES2.HEAD = "head", TAG_NAMES2.HEADER = "header", TAG_NAMES2.HGROUP = "hgroup", TAG_NAMES2.HR = "hr", TAG_NAMES2.HTML = "html", TAG_NAMES2.I = "i", TAG_NAMES2.IMG = "img", TAG_NAMES2.IMAGE = "image", TAG_NAMES2.INPUT = "input", TAG_NAMES2.IFRAME = "iframe", TAG_NAMES2.KEYGEN = "keygen", TAG_NAMES2.LABEL = "label", TAG_NAMES2.LI = "li", TAG_NAMES2.LINK = "link", TAG_NAMES2.LISTING = "listing", TAG_NAMES2.MAIN = "main", TAG_NAMES2.MALIGNMARK = "malignmark", TAG_NAMES2.MARQUEE = "marquee", TAG_NAMES2.MATH = "math", TAG_NAMES2.MENU = "menu", TAG_NAMES2.META = "meta", TAG_NAMES2.MGLYPH = "mglyph", TAG_NAMES2.MI = "mi", TAG_NAMES2.MO = "mo", TAG_NAMES2.MN = "mn", TAG_NAMES2.MS = "ms", TAG_NAMES2.MTEXT = "mtext", TAG_NAMES2.NAV = "nav", TAG_NAMES2.NOBR = "nobr", TAG_NAMES2.NOFRAMES = "noframes", TAG_NAMES2.NOEMBED = "noembed", TAG_NAMES2.NOSCRIPT = "noscript", TAG_NAMES2.OBJECT = "object", TAG_NAMES2.OL = "ol", TAG_NAMES2.OPTGROUP = "optgroup", TAG_NAMES2.OPTION = "option", TAG_NAMES2.P = "p", TAG_NAMES2.PARAM = "param", TAG_NAMES2.PLAINTEXT = "plaintext", TAG_NAMES2.PRE = "pre", TAG_NAMES2.RB = "rb", TAG_NAMES2.RP = "rp", TAG_NAMES2.RT = "rt", TAG_NAMES2.RTC = "rtc", TAG_NAMES2.RUBY = "ruby", TAG_NAMES2.S = "s", TAG_NAMES2.SCRIPT = "script", TAG_NAMES2.SEARCH = "search", TAG_NAMES2.SECTION = "section", TAG_NAMES2.SELECT = "select", TAG_NAMES2.SOURCE = "source", TAG_NAMES2.SMALL = "small", TAG_NAMES2.SPAN = "span", TAG_NAMES2.STRIKE = "strike", TAG_NAMES2.STRONG = "strong", TAG_NAMES2.STYLE = "style", TAG_NAMES2.SUB = "sub", TAG_NAMES2.SUMMARY = "summary", TAG_NAMES2.SUP = "sup", TAG_NAMES2.TABLE = "table", TAG_NAMES2.TBODY = "tbody", TAG_NAMES2.TEMPLATE = "template", TAG_NAMES2.TEXTAREA = "textarea", TAG_NAMES2.TFOOT = "tfoot", TAG_NAMES2.TD = "td", TAG_NAMES2.TH = "th", TAG_NAMES2.THEAD = "thead", TAG_NAMES2.TITLE = "title", TAG_NAMES2.TR = "tr", TAG_NAMES2.TRACK = "track", TAG_NAMES2.TT = "tt", TAG_NAMES2.U = "u", TAG_NAMES2.UL = "ul", TAG_NAMES2.SVG = "svg", TAG_NAMES2.VAR = "var", TAG_NAMES2.WBR = "wbr", TAG_NAMES2.XMP = "xmp";
})(TAG_NAMES || (TAG_NAMES = {}));
var TAG_ID;
(function(TAG_ID2) {
  TAG_ID2[TAG_ID2.UNKNOWN = 0] = "UNKNOWN", TAG_ID2[TAG_ID2.A = 1] = "A", TAG_ID2[TAG_ID2.ADDRESS = 2] = "ADDRESS", TAG_ID2[TAG_ID2.ANNOTATION_XML = 3] = "ANNOTATION_XML", TAG_ID2[TAG_ID2.APPLET = 4] = "APPLET", TAG_ID2[TAG_ID2.AREA = 5] = "AREA", TAG_ID2[TAG_ID2.ARTICLE = 6] = "ARTICLE", TAG_ID2[TAG_ID2.ASIDE = 7] = "ASIDE", TAG_ID2[TAG_ID2.B = 8] = "B", TAG_ID2[TAG_ID2.BASE = 9] = "BASE", TAG_ID2[TAG_ID2.BASEFONT = 10] = "BASEFONT", TAG_ID2[TAG_ID2.BGSOUND = 11] = "BGSOUND", TAG_ID2[TAG_ID2.BIG = 12] = "BIG", TAG_ID2[TAG_ID2.BLOCKQUOTE = 13] = "BLOCKQUOTE", TAG_ID2[TAG_ID2.BODY = 14] = "BODY", TAG_ID2[TAG_ID2.BR = 15] = "BR", TAG_ID2[TAG_ID2.BUTTON = 16] = "BUTTON", TAG_ID2[TAG_ID2.CAPTION = 17] = "CAPTION", TAG_ID2[TAG_ID2.CENTER = 18] = "CENTER", TAG_ID2[TAG_ID2.CODE = 19] = "CODE", TAG_ID2[TAG_ID2.COL = 20] = "COL", TAG_ID2[TAG_ID2.COLGROUP = 21] = "COLGROUP", TAG_ID2[TAG_ID2.DD = 22] = "DD", TAG_ID2[TAG_ID2.DESC = 23] = "DESC", TAG_ID2[TAG_ID2.DETAILS = 24] = "DETAILS", TAG_ID2[TAG_ID2.DIALOG = 25] = "DIALOG", TAG_ID2[TAG_ID2.DIR = 26] = "DIR", TAG_ID2[TAG_ID2.DIV = 27] = "DIV", TAG_ID2[TAG_ID2.DL = 28] = "DL", TAG_ID2[TAG_ID2.DT = 29] = "DT", TAG_ID2[TAG_ID2.EM = 30] = "EM", TAG_ID2[TAG_ID2.EMBED = 31] = "EMBED", TAG_ID2[TAG_ID2.FIELDSET = 32] = "FIELDSET", TAG_ID2[TAG_ID2.FIGCAPTION = 33] = "FIGCAPTION", TAG_ID2[TAG_ID2.FIGURE = 34] = "FIGURE", TAG_ID2[TAG_ID2.FONT = 35] = "FONT", TAG_ID2[TAG_ID2.FOOTER = 36] = "FOOTER", TAG_ID2[TAG_ID2.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", TAG_ID2[TAG_ID2.FORM = 38] = "FORM", TAG_ID2[TAG_ID2.FRAME = 39] = "FRAME", TAG_ID2[TAG_ID2.FRAMESET = 40] = "FRAMESET", TAG_ID2[TAG_ID2.H1 = 41] = "H1", TAG_ID2[TAG_ID2.H2 = 42] = "H2", TAG_ID2[TAG_ID2.H3 = 43] = "H3", TAG_ID2[TAG_ID2.H4 = 44] = "H4", TAG_ID2[TAG_ID2.H5 = 45] = "H5", TAG_ID2[TAG_ID2.H6 = 46] = "H6", TAG_ID2[TAG_ID2.HEAD = 47] = "HEAD", TAG_ID2[TAG_ID2.HEADER = 48] = "HEADER", TAG_ID2[TAG_ID2.HGROUP = 49] = "HGROUP", TAG_ID2[TAG_ID2.HR = 50] = "HR", TAG_ID2[TAG_ID2.HTML = 51] = "HTML", TAG_ID2[TAG_ID2.I = 52] = "I", TAG_ID2[TAG_ID2.IMG = 53] = "IMG", TAG_ID2[TAG_ID2.IMAGE = 54] = "IMAGE", TAG_ID2[TAG_ID2.INPUT = 55] = "INPUT", TAG_ID2[TAG_ID2.IFRAME = 56] = "IFRAME", TAG_ID2[TAG_ID2.KEYGEN = 57] = "KEYGEN", TAG_ID2[TAG_ID2.LABEL = 58] = "LABEL", TAG_ID2[TAG_ID2.LI = 59] = "LI", TAG_ID2[TAG_ID2.LINK = 60] = "LINK", TAG_ID2[TAG_ID2.LISTING = 61] = "LISTING", TAG_ID2[TAG_ID2.MAIN = 62] = "MAIN", TAG_ID2[TAG_ID2.MALIGNMARK = 63] = "MALIGNMARK", TAG_ID2[TAG_ID2.MARQUEE = 64] = "MARQUEE", TAG_ID2[TAG_ID2.MATH = 65] = "MATH", TAG_ID2[TAG_ID2.MENU = 66] = "MENU", TAG_ID2[TAG_ID2.META = 67] = "META", TAG_ID2[TAG_ID2.MGLYPH = 68] = "MGLYPH", TAG_ID2[TAG_ID2.MI = 69] = "MI", TAG_ID2[TAG_ID2.MO = 70] = "MO", TAG_ID2[TAG_ID2.MN = 71] = "MN", TAG_ID2[TAG_ID2.MS = 72] = "MS", TAG_ID2[TAG_ID2.MTEXT = 73] = "MTEXT", TAG_ID2[TAG_ID2.NAV = 74] = "NAV", TAG_ID2[TAG_ID2.NOBR = 75] = "NOBR", TAG_ID2[TAG_ID2.NOFRAMES = 76] = "NOFRAMES", TAG_ID2[TAG_ID2.NOEMBED = 77] = "NOEMBED", TAG_ID2[TAG_ID2.NOSCRIPT = 78] = "NOSCRIPT", TAG_ID2[TAG_ID2.OBJECT = 79] = "OBJECT", TAG_ID2[TAG_ID2.OL = 80] = "OL", TAG_ID2[TAG_ID2.OPTGROUP = 81] = "OPTGROUP", TAG_ID2[TAG_ID2.OPTION = 82] = "OPTION", TAG_ID2[TAG_ID2.P = 83] = "P", TAG_ID2[TAG_ID2.PARAM = 84] = "PARAM", TAG_ID2[TAG_ID2.PLAINTEXT = 85] = "PLAINTEXT", TAG_ID2[TAG_ID2.PRE = 86] = "PRE", TAG_ID2[TAG_ID2.RB = 87] = "RB", TAG_ID2[TAG_ID2.RP = 88] = "RP", TAG_ID2[TAG_ID2.RT = 89] = "RT", TAG_ID2[TAG_ID2.RTC = 90] = "RTC", TAG_ID2[TAG_ID2.RUBY = 91] = "RUBY", TAG_ID2[TAG_ID2.S = 92] = "S", TAG_ID2[TAG_ID2.SCRIPT = 93] = "SCRIPT", TAG_ID2[TAG_ID2.SEARCH = 94] = "SEARCH", TAG_ID2[TAG_ID2.SECTION = 95] = "SECTION", TAG_ID2[TAG_ID2.SELECT = 96] = "SELECT", TAG_ID2[TAG_ID2.SOURCE = 97] = "SOURCE", TAG_ID2[TAG_ID2.SMALL = 98] = "SMALL", TAG_ID2[TAG_ID2.SPAN = 99] = "SPAN", TAG_ID2[TAG_ID2.STRIKE = 100] = "STRIKE", TAG_ID2[TAG_ID2.STRONG = 101] = "STRONG", TAG_ID2[TAG_ID2.STYLE = 102] = "STYLE", TAG_ID2[TAG_ID2.SUB = 103] = "SUB", TAG_ID2[TAG_ID2.SUMMARY = 104] = "SUMMARY", TAG_ID2[TAG_ID2.SUP = 105] = "SUP", TAG_ID2[TAG_ID2.TABLE = 106] = "TABLE", TAG_ID2[TAG_ID2.TBODY = 107] = "TBODY", TAG_ID2[TAG_ID2.TEMPLATE = 108] = "TEMPLATE", TAG_ID2[TAG_ID2.TEXTAREA = 109] = "TEXTAREA", TAG_ID2[TAG_ID2.TFOOT = 110] = "TFOOT", TAG_ID2[TAG_ID2.TD = 111] = "TD", TAG_ID2[TAG_ID2.TH = 112] = "TH", TAG_ID2[TAG_ID2.THEAD = 113] = "THEAD", TAG_ID2[TAG_ID2.TITLE = 114] = "TITLE", TAG_ID2[TAG_ID2.TR = 115] = "TR", TAG_ID2[TAG_ID2.TRACK = 116] = "TRACK", TAG_ID2[TAG_ID2.TT = 117] = "TT", TAG_ID2[TAG_ID2.U = 118] = "U", TAG_ID2[TAG_ID2.UL = 119] = "UL", TAG_ID2[TAG_ID2.SVG = 120] = "SVG", TAG_ID2[TAG_ID2.VAR = 121] = "VAR", TAG_ID2[TAG_ID2.WBR = 122] = "WBR", TAG_ID2[TAG_ID2.XMP = 123] = "XMP";
})(TAG_ID || (TAG_ID = {}));
var TAG_NAME_TO_ID = /* @__PURE__ */ new Map([
  [TAG_NAMES.A, TAG_ID.A],
  [TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
  [TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
  [TAG_NAMES.APPLET, TAG_ID.APPLET],
  [TAG_NAMES.AREA, TAG_ID.AREA],
  [TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
  [TAG_NAMES.ASIDE, TAG_ID.ASIDE],
  [TAG_NAMES.B, TAG_ID.B],
  [TAG_NAMES.BASE, TAG_ID.BASE],
  [TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
  [TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
  [TAG_NAMES.BIG, TAG_ID.BIG],
  [TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
  [TAG_NAMES.BODY, TAG_ID.BODY],
  [TAG_NAMES.BR, TAG_ID.BR],
  [TAG_NAMES.BUTTON, TAG_ID.BUTTON],
  [TAG_NAMES.CAPTION, TAG_ID.CAPTION],
  [TAG_NAMES.CENTER, TAG_ID.CENTER],
  [TAG_NAMES.CODE, TAG_ID.CODE],
  [TAG_NAMES.COL, TAG_ID.COL],
  [TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
  [TAG_NAMES.DD, TAG_ID.DD],
  [TAG_NAMES.DESC, TAG_ID.DESC],
  [TAG_NAMES.DETAILS, TAG_ID.DETAILS],
  [TAG_NAMES.DIALOG, TAG_ID.DIALOG],
  [TAG_NAMES.DIR, TAG_ID.DIR],
  [TAG_NAMES.DIV, TAG_ID.DIV],
  [TAG_NAMES.DL, TAG_ID.DL],
  [TAG_NAMES.DT, TAG_ID.DT],
  [TAG_NAMES.EM, TAG_ID.EM],
  [TAG_NAMES.EMBED, TAG_ID.EMBED],
  [TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
  [TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
  [TAG_NAMES.FIGURE, TAG_ID.FIGURE],
  [TAG_NAMES.FONT, TAG_ID.FONT],
  [TAG_NAMES.FOOTER, TAG_ID.FOOTER],
  [TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
  [TAG_NAMES.FORM, TAG_ID.FORM],
  [TAG_NAMES.FRAME, TAG_ID.FRAME],
  [TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
  [TAG_NAMES.H1, TAG_ID.H1],
  [TAG_NAMES.H2, TAG_ID.H2],
  [TAG_NAMES.H3, TAG_ID.H3],
  [TAG_NAMES.H4, TAG_ID.H4],
  [TAG_NAMES.H5, TAG_ID.H5],
  [TAG_NAMES.H6, TAG_ID.H6],
  [TAG_NAMES.HEAD, TAG_ID.HEAD],
  [TAG_NAMES.HEADER, TAG_ID.HEADER],
  [TAG_NAMES.HGROUP, TAG_ID.HGROUP],
  [TAG_NAMES.HR, TAG_ID.HR],
  [TAG_NAMES.HTML, TAG_ID.HTML],
  [TAG_NAMES.I, TAG_ID.I],
  [TAG_NAMES.IMG, TAG_ID.IMG],
  [TAG_NAMES.IMAGE, TAG_ID.IMAGE],
  [TAG_NAMES.INPUT, TAG_ID.INPUT],
  [TAG_NAMES.IFRAME, TAG_ID.IFRAME],
  [TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
  [TAG_NAMES.LABEL, TAG_ID.LABEL],
  [TAG_NAMES.LI, TAG_ID.LI],
  [TAG_NAMES.LINK, TAG_ID.LINK],
  [TAG_NAMES.LISTING, TAG_ID.LISTING],
  [TAG_NAMES.MAIN, TAG_ID.MAIN],
  [TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
  [TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
  [TAG_NAMES.MATH, TAG_ID.MATH],
  [TAG_NAMES.MENU, TAG_ID.MENU],
  [TAG_NAMES.META, TAG_ID.META],
  [TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
  [TAG_NAMES.MI, TAG_ID.MI],
  [TAG_NAMES.MO, TAG_ID.MO],
  [TAG_NAMES.MN, TAG_ID.MN],
  [TAG_NAMES.MS, TAG_ID.MS],
  [TAG_NAMES.MTEXT, TAG_ID.MTEXT],
  [TAG_NAMES.NAV, TAG_ID.NAV],
  [TAG_NAMES.NOBR, TAG_ID.NOBR],
  [TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
  [TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
  [TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
  [TAG_NAMES.OBJECT, TAG_ID.OBJECT],
  [TAG_NAMES.OL, TAG_ID.OL],
  [TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
  [TAG_NAMES.OPTION, TAG_ID.OPTION],
  [TAG_NAMES.P, TAG_ID.P],
  [TAG_NAMES.PARAM, TAG_ID.PARAM],
  [TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
  [TAG_NAMES.PRE, TAG_ID.PRE],
  [TAG_NAMES.RB, TAG_ID.RB],
  [TAG_NAMES.RP, TAG_ID.RP],
  [TAG_NAMES.RT, TAG_ID.RT],
  [TAG_NAMES.RTC, TAG_ID.RTC],
  [TAG_NAMES.RUBY, TAG_ID.RUBY],
  [TAG_NAMES.S, TAG_ID.S],
  [TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
  [TAG_NAMES.SEARCH, TAG_ID.SEARCH],
  [TAG_NAMES.SECTION, TAG_ID.SECTION],
  [TAG_NAMES.SELECT, TAG_ID.SELECT],
  [TAG_NAMES.SOURCE, TAG_ID.SOURCE],
  [TAG_NAMES.SMALL, TAG_ID.SMALL],
  [TAG_NAMES.SPAN, TAG_ID.SPAN],
  [TAG_NAMES.STRIKE, TAG_ID.STRIKE],
  [TAG_NAMES.STRONG, TAG_ID.STRONG],
  [TAG_NAMES.STYLE, TAG_ID.STYLE],
  [TAG_NAMES.SUB, TAG_ID.SUB],
  [TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
  [TAG_NAMES.SUP, TAG_ID.SUP],
  [TAG_NAMES.TABLE, TAG_ID.TABLE],
  [TAG_NAMES.TBODY, TAG_ID.TBODY],
  [TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
  [TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
  [TAG_NAMES.TFOOT, TAG_ID.TFOOT],
  [TAG_NAMES.TD, TAG_ID.TD],
  [TAG_NAMES.TH, TAG_ID.TH],
  [TAG_NAMES.THEAD, TAG_ID.THEAD],
  [TAG_NAMES.TITLE, TAG_ID.TITLE],
  [TAG_NAMES.TR, TAG_ID.TR],
  [TAG_NAMES.TRACK, TAG_ID.TRACK],
  [TAG_NAMES.TT, TAG_ID.TT],
  [TAG_NAMES.U, TAG_ID.U],
  [TAG_NAMES.UL, TAG_ID.UL],
  [TAG_NAMES.SVG, TAG_ID.SVG],
  [TAG_NAMES.VAR, TAG_ID.VAR],
  [TAG_NAMES.WBR, TAG_ID.WBR],
  [TAG_NAMES.XMP, TAG_ID.XMP]
]);
function getTagID(tagName) {
  var _a2;
  return (_a2 = TAG_NAME_TO_ID.get(tagName)) !== null && _a2 !== void 0 ? _a2 : TAG_ID.UNKNOWN;
}
var $ = TAG_ID, SPECIAL_ELEMENTS = {
  [NS.HTML]: /* @__PURE__ */ new Set([
    $.ADDRESS,
    $.APPLET,
    $.AREA,
    $.ARTICLE,
    $.ASIDE,
    $.BASE,
    $.BASEFONT,
    $.BGSOUND,
    $.BLOCKQUOTE,
    $.BODY,
    $.BR,
    $.BUTTON,
    $.CAPTION,
    $.CENTER,
    $.COL,
    $.COLGROUP,
    $.DD,
    $.DETAILS,
    $.DIR,
    $.DIV,
    $.DL,
    $.DT,
    $.EMBED,
    $.FIELDSET,
    $.FIGCAPTION,
    $.FIGURE,
    $.FOOTER,
    $.FORM,
    $.FRAME,
    $.FRAMESET,
    $.H1,
    $.H2,
    $.H3,
    $.H4,
    $.H5,
    $.H6,
    $.HEAD,
    $.HEADER,
    $.HGROUP,
    $.HR,
    $.HTML,
    $.IFRAME,
    $.IMG,
    $.INPUT,
    $.LI,
    $.LINK,
    $.LISTING,
    $.MAIN,
    $.MARQUEE,
    $.MENU,
    $.META,
    $.NAV,
    $.NOEMBED,
    $.NOFRAMES,
    $.NOSCRIPT,
    $.OBJECT,
    $.OL,
    $.P,
    $.PARAM,
    $.PLAINTEXT,
    $.PRE,
    $.SCRIPT,
    $.SECTION,
    $.SELECT,
    $.SOURCE,
    $.STYLE,
    $.SUMMARY,
    $.TABLE,
    $.TBODY,
    $.TD,
    $.TEMPLATE,
    $.TEXTAREA,
    $.TFOOT,
    $.TH,
    $.THEAD,
    $.TITLE,
    $.TR,
    $.TRACK,
    $.UL,
    $.WBR,
    $.XMP
  ]),
  [NS.MATHML]: /* @__PURE__ */ new Set([$.MI, $.MO, $.MN, $.MS, $.MTEXT, $.ANNOTATION_XML]),
  [NS.SVG]: /* @__PURE__ */ new Set([$.TITLE, $.FOREIGN_OBJECT, $.DESC]),
  [NS.XLINK]: /* @__PURE__ */ new Set(),
  [NS.XML]: /* @__PURE__ */ new Set(),
  [NS.XMLNS]: /* @__PURE__ */ new Set()
}, NUMBERED_HEADERS = /* @__PURE__ */ new Set([$.H1, $.H2, $.H3, $.H4, $.H5, $.H6]), UNESCAPED_TEXT = /* @__PURE__ */ new Set([
  TAG_NAMES.STYLE,
  TAG_NAMES.SCRIPT,
  TAG_NAMES.XMP,
  TAG_NAMES.IFRAME,
  TAG_NAMES.NOEMBED,
  TAG_NAMES.NOFRAMES,
  TAG_NAMES.PLAINTEXT
]);

// node_modules/parse5/dist/tokenizer/index.js
var State;
(function(State2) {
  State2[State2.DATA = 0] = "DATA", State2[State2.RCDATA = 1] = "RCDATA", State2[State2.RAWTEXT = 2] = "RAWTEXT", State2[State2.SCRIPT_DATA = 3] = "SCRIPT_DATA", State2[State2.PLAINTEXT = 4] = "PLAINTEXT", State2[State2.TAG_OPEN = 5] = "TAG_OPEN", State2[State2.END_TAG_OPEN = 6] = "END_TAG_OPEN", State2[State2.TAG_NAME = 7] = "TAG_NAME", State2[State2.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", State2[State2.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", State2[State2.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", State2[State2.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", State2[State2.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", State2[State2.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", State2[State2.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", State2[State2.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", State2[State2.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", State2[State2.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", State2[State2.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", State2[State2.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", State2[State2.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", State2[State2.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", State2[State2.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", State2[State2.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", State2[State2.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", State2[State2.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", State2[State2.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", State2[State2.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", State2[State2.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", State2[State2.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", State2[State2.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", State2[State2.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", State2[State2.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", State2[State2.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", State2[State2.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", State2[State2.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", State2[State2.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", State2[State2.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", State2[State2.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", State2[State2.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", State2[State2.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", State2[State2.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", State2[State2.COMMENT_START = 42] = "COMMENT_START", State2[State2.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", State2[State2.COMMENT = 44] = "COMMENT", State2[State2.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", State2[State2.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", State2[State2.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", State2[State2.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", State2[State2.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", State2[State2.COMMENT_END = 50] = "COMMENT_END", State2[State2.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", State2[State2.DOCTYPE = 52] = "DOCTYPE", State2[State2.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", State2[State2.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", State2[State2.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", State2[State2.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", State2[State2.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", State2[State2.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", State2[State2.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", State2[State2.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", State2[State2.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", State2[State2.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", State2[State2.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", State2[State2.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", State2[State2.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", State2[State2.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", State2[State2.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", State2[State2.CDATA_SECTION = 68] = "CDATA_SECTION", State2[State2.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", State2[State2.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", State2[State2.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", State2[State2.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND";
})(State || (State = {}));
var TokenizerMode = {
  DATA: State.DATA,
  RCDATA: State.RCDATA,
  RAWTEXT: State.RAWTEXT,
  SCRIPT_DATA: State.SCRIPT_DATA,
  PLAINTEXT: State.PLAINTEXT,
  CDATA_SECTION: State.CDATA_SECTION
};
function isAsciiDigit(cp) {
  return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
}
function isAsciiUpper(cp) {
  return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
}
function isAsciiLower(cp) {
  return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
}
function isAsciiLetter(cp) {
  return isAsciiLower(cp) || isAsciiUpper(cp);
}
function isAsciiAlphaNumeric2(cp) {
  return isAsciiLetter(cp) || isAsciiDigit(cp);
}
function toAsciiLower(cp) {
  return cp + 32;
}
function isWhitespace(cp) {
  return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
}
function isScriptDataDoubleEscapeSequenceEnd(cp) {
  return isWhitespace(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
}
function getErrorForNumericCharacterReference(code) {
  return code === CODE_POINTS.NULL ? ERR.nullCharacterReference : code > 1114111 ? ERR.characterReferenceOutsideUnicodeRange : isSurrogate(code) ? ERR.surrogateCharacterReference : isUndefinedCodePoint(code) ? ERR.noncharacterCharacterReference : isControlCodePoint(code) || code === CODE_POINTS.CARRIAGE_RETURN ? ERR.controlCharacterReference : null;
}
var Tokenizer = class {
  constructor(options2, handler) {
    this.options = options2, this.handler = handler, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = State.DATA, this.returnState = State.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new Preprocessor(handler), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new EntityDecoder(htmlDecodeTree, (cp, consumed) => {
      this.preprocessor.pos = this.entityStartPos + consumed - 1, this._flushCodePointConsumedAsCharacterReference(cp);
    }, handler.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(ERR.missingSemicolonAfterCharacterReference, 1);
      },
      absenceOfDigitsInNumericCharacterReference: (consumed) => {
        this._err(ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
      },
      validateNumericCharacterReference: (code) => {
        let error = getErrorForNumericCharacterReference(code);
        error && this._err(error, 1);
      }
    } : void 0);
  }
  //Errors
  _err(code, cpOffset = 0) {
    var _a2, _b;
    (_b = (_a2 = this.handler).onParseError) === null || _b === void 0 || _b.call(_a2, this.preprocessor.getError(code, cpOffset));
  }
  // NOTE: `offset` may never run across line boundaries.
  getCurrentLocation(offset) {
    return this.options.sourceCodeLocationInfo ? {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - offset,
      startOffset: this.preprocessor.offset - offset,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    } : null;
  }
  _runParsingLoop() {
    if (!this.inLoop) {
      for (this.inLoop = !0; this.active && !this.paused; ) {
        this.consumedAfterSnapshot = 0;
        let cp = this._consume();
        this._ensureHibernation() || this._callState(cp);
      }
      this.inLoop = !1;
    }
  }
  //API
  pause() {
    this.paused = !0;
  }
  resume(writeCallback) {
    if (!this.paused)
      throw new Error("Parser was already resumed");
    this.paused = !1, !this.inLoop && (this._runParsingLoop(), this.paused || writeCallback?.());
  }
  write(chunk, isLastChunk, writeCallback) {
    this.active = !0, this.preprocessor.write(chunk, isLastChunk), this._runParsingLoop(), this.paused || writeCallback?.();
  }
  insertHtmlAtCurrentPos(chunk) {
    this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(chunk), this._runParsingLoop();
  }
  //Hibernation
  _ensureHibernation() {
    return this.preprocessor.endOfChunkHit ? (this.preprocessor.retreat(this.consumedAfterSnapshot), this.consumedAfterSnapshot = 0, this.active = !1, !0) : !1;
  }
  //Consumption
  _consume() {
    return this.consumedAfterSnapshot++, this.preprocessor.advance();
  }
  _advanceBy(count) {
    this.consumedAfterSnapshot += count;
    for (let i = 0; i < count; i++)
      this.preprocessor.advance();
  }
  _consumeSequenceIfMatch(pattern, caseSensitive) {
    return this.preprocessor.startsWith(pattern, caseSensitive) ? (this._advanceBy(pattern.length - 1), !0) : !1;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: TokenType.START_TAG,
      tagName: "",
      tagID: TAG_ID.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: TokenType.END_TAG,
      tagName: "",
      tagID: TAG_ID.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(offset) {
    this.currentToken = {
      type: TokenType.COMMENT,
      data: "",
      location: this.getCurrentLocation(offset)
    };
  }
  _createDoctypeToken(initialName) {
    this.currentToken = {
      type: TokenType.DOCTYPE,
      name: initialName,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(type, chars) {
    this.currentCharacterToken = {
      type,
      chars,
      location: this.currentLocation
    };
  }
  //Tag attributes
  _createAttr(attrNameFirstCh) {
    this.currentAttr = {
      name: attrNameFirstCh,
      value: ""
    }, this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var _a2, _b;
    let token = this.currentToken;
    if (getTokenAttr(token, this.currentAttr.name) === null) {
      if (token.attrs.push(this.currentAttr), token.location && this.currentLocation) {
        let attrLocations = (_a2 = (_b = token.location).attrs) !== null && _a2 !== void 0 ? _a2 : _b.attrs = /* @__PURE__ */ Object.create(null);
        attrLocations[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(ERR.duplicateAttribute);
  }
  _leaveAttrValue() {
    this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset);
  }
  //Token emission
  prepareToken(ct) {
    this._emitCurrentCharacterToken(ct.location), this.currentToken = null, ct.location && (ct.location.endLine = this.preprocessor.line, ct.location.endCol = this.preprocessor.col + 1, ct.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    let ct = this.currentToken;
    this.prepareToken(ct), ct.tagID = getTagID(ct.tagName), ct.type === TokenType.START_TAG ? (this.lastStartTagName = ct.tagName, this.handler.onStartTag(ct)) : (ct.attrs.length > 0 && this._err(ERR.endTagWithAttributes), ct.selfClosing && this._err(ERR.endTagWithTrailingSolidus), this.handler.onEndTag(ct)), this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(ct) {
    this.prepareToken(ct), this.handler.onComment(ct), this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(ct) {
    this.prepareToken(ct), this.handler.onDoctype(ct), this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(nextLocation) {
    if (this.currentCharacterToken) {
      switch (nextLocation && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = nextLocation.startLine, this.currentCharacterToken.location.endCol = nextLocation.startCol, this.currentCharacterToken.location.endOffset = nextLocation.startOffset), this.currentCharacterToken.type) {
        case TokenType.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case TokenType.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case TokenType.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    let location = this.getCurrentLocation(0);
    location && (location.endLine = location.startLine, location.endCol = location.startCol, location.endOffset = location.startOffset), this._emitCurrentCharacterToken(location), this.handler.onEof({ type: TokenType.EOF, location }), this.active = !1;
  }
  //Characters emission
  //OPTIMIZATION: The specification uses only one type of character token (one token per character).
  //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
  //If we have a sequence of characters that belong to the same group, the parser can process it
  //as a single solid character token.
  //So, there are 3 types of character tokens in parse5:
  //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
  //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
  //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
  _appendCharToCurrentCharacterToken(type, ch) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type === type) {
        this.currentCharacterToken.chars += ch;
        return;
      } else
        this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
    this._createCharacterToken(type, ch);
  }
  _emitCodePoint(cp) {
    let type = isWhitespace(cp) ? TokenType.WHITESPACE_CHARACTER : cp === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
    this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(ch) {
    this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
  }
  // Character reference helpers
  _startCharacterReference() {
    this.returnState = this.state, this.state = State.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? DecodingMode.Attribute : DecodingMode.Legacy);
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(cp) {
    this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(cp) : this._emitCodePoint(cp);
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(cp) {
    switch (this.state) {
      case State.DATA: {
        this._stateData(cp);
        break;
      }
      case State.RCDATA: {
        this._stateRcdata(cp);
        break;
      }
      case State.RAWTEXT: {
        this._stateRawtext(cp);
        break;
      }
      case State.SCRIPT_DATA: {
        this._stateScriptData(cp);
        break;
      }
      case State.PLAINTEXT: {
        this._statePlaintext(cp);
        break;
      }
      case State.TAG_OPEN: {
        this._stateTagOpen(cp);
        break;
      }
      case State.END_TAG_OPEN: {
        this._stateEndTagOpen(cp);
        break;
      }
      case State.TAG_NAME: {
        this._stateTagName(cp);
        break;
      }
      case State.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(cp);
        break;
      }
      case State.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(cp);
        break;
      }
      case State.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(cp);
        break;
      }
      case State.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(cp);
        break;
      }
      case State.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(cp);
        break;
      }
      case State.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(cp);
        break;
      }
      case State.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(cp);
        break;
      }
      case State.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(cp);
        break;
      }
      case State.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(cp);
        break;
      }
      case State.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(cp);
        break;
      }
      case State.ATTRIBUTE_NAME: {
        this._stateAttributeName(cp);
        break;
      }
      case State.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(cp);
        break;
      }
      case State.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(cp);
        break;
      }
      case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(cp);
        break;
      }
      case State.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(cp);
        break;
      }
      case State.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(cp);
        break;
      }
      case State.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(cp);
        break;
      }
      case State.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(cp);
        break;
      }
      case State.BOGUS_COMMENT: {
        this._stateBogusComment(cp);
        break;
      }
      case State.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(cp);
        break;
      }
      case State.COMMENT_START: {
        this._stateCommentStart(cp);
        break;
      }
      case State.COMMENT_START_DASH: {
        this._stateCommentStartDash(cp);
        break;
      }
      case State.COMMENT: {
        this._stateComment(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(cp);
        break;
      }
      case State.COMMENT_END_DASH: {
        this._stateCommentEndDash(cp);
        break;
      }
      case State.COMMENT_END: {
        this._stateCommentEnd(cp);
        break;
      }
      case State.COMMENT_END_BANG: {
        this._stateCommentEndBang(cp);
        break;
      }
      case State.DOCTYPE: {
        this._stateDoctype(cp);
        break;
      }
      case State.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(cp);
        break;
      }
      case State.DOCTYPE_NAME: {
        this._stateDoctypeName(cp);
        break;
      }
      case State.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(cp);
        break;
      }
      case State.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(cp);
        break;
      }
      case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(cp);
        break;
      }
      case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(cp);
        break;
      }
      case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(cp);
        break;
      }
      case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(cp);
        break;
      }
      case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
        break;
      }
      case State.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(cp);
        break;
      }
      case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(cp);
        break;
      }
      case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
        break;
      }
      case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(cp);
        break;
      }
      case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(cp);
        break;
      }
      case State.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(cp);
        break;
      }
      case State.CDATA_SECTION: {
        this._stateCdataSection(cp);
        break;
      }
      case State.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(cp);
        break;
      }
      case State.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(cp);
        break;
      }
      case State.CHARACTER_REFERENCE: {
        this._stateCharacterReference();
        break;
      }
      case State.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(cp);
        break;
      }
      default:
        throw new Error("Unknown state");
    }
  }
  // State machine
  // Data state
  //------------------------------------------------------------------
  _stateData(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.TAG_OPEN;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this._emitCodePoint(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(cp);
    }
  }
  //  RCDATA state
  //------------------------------------------------------------------
  _stateRcdata(cp) {
    switch (cp) {
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(cp);
    }
  }
  // RAWTEXT state
  //------------------------------------------------------------------
  _stateRawtext(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(cp);
    }
  }
  // Script data state
  //------------------------------------------------------------------
  _stateScriptData(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(cp);
    }
  }
  // PLAINTEXT state
  //------------------------------------------------------------------
  _statePlaintext(cp) {
    switch (cp) {
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(cp);
    }
  }
  // Tag open state
  //------------------------------------------------------------------
  _stateTagOpen(cp) {
    if (isAsciiLetter(cp))
      this._createStartTagToken(), this.state = State.TAG_NAME, this._stateTagName(cp);
    else
      switch (cp) {
        case CODE_POINTS.EXCLAMATION_MARK: {
          this.state = State.MARKUP_DECLARATION_OPEN;
          break;
        }
        case CODE_POINTS.SOLIDUS: {
          this.state = State.END_TAG_OPEN;
          break;
        }
        case CODE_POINTS.QUESTION_MARK: {
          this._err(ERR.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = State.BOGUS_COMMENT, this._stateBogusComment(cp);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(ERR.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = State.DATA, this._stateData(cp);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(cp) {
    if (isAsciiLetter(cp))
      this._createEndTagToken(), this.state = State.TAG_NAME, this._stateTagName(cp);
    else
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingEndTagName), this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(ERR.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = State.BOGUS_COMMENT, this._stateBogusComment(cp);
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA, this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), token.tagName += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(cp) {
    cp === CODE_POINTS.SOLIDUS ? this.state = State.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = State.RCDATA, this._stateRcdata(cp));
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(cp) {
    isAsciiLetter(cp) ? (this.state = State.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(cp)) : (this._emitChars("</"), this.state = State.RCDATA, this._stateRcdata(cp));
  }
  handleSpecialEndTag(_cp) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    let token = this.currentToken;
    switch (token.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
        return this._advanceBy(this.lastStartTagName.length), this.state = State.BEFORE_ATTRIBUTE_NAME, !1;
      case CODE_POINTS.SOLIDUS:
        return this._advanceBy(this.lastStartTagName.length), this.state = State.SELF_CLOSING_START_TAG, !1;
      case CODE_POINTS.GREATER_THAN_SIGN:
        return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = State.DATA, !1;
      default:
        return !this._ensureHibernation();
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(cp) {
    this.handleSpecialEndTag(cp) && (this._emitChars("</"), this.state = State.RCDATA, this._stateRcdata(cp));
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(cp) {
    cp === CODE_POINTS.SOLIDUS ? this.state = State.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = State.RAWTEXT, this._stateRawtext(cp));
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(cp) {
    isAsciiLetter(cp) ? (this.state = State.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(cp)) : (this._emitChars("</"), this.state = State.RAWTEXT, this._stateRawtext(cp));
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(cp) {
    this.handleSpecialEndTag(cp) && (this._emitChars("</"), this.state = State.RAWTEXT, this._stateRawtext(cp));
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(cp) {
    switch (cp) {
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case CODE_POINTS.EXCLAMATION_MARK: {
        this.state = State.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
        break;
      }
      default:
        this._emitChars("<"), this.state = State.SCRIPT_DATA, this._stateScriptData(cp);
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(cp) {
    isAsciiLetter(cp) ? (this.state = State.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(cp)) : (this._emitChars("</"), this.state = State.SCRIPT_DATA, this._stateScriptData(cp));
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(cp) {
    this.handleSpecialEndTag(cp) && (this._emitChars("</"), this.state = State.SCRIPT_DATA, this._stateScriptData(cp));
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(cp) {
    cp === CODE_POINTS.HYPHEN_MINUS ? (this.state = State.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = State.SCRIPT_DATA, this._stateScriptData(cp));
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(cp) {
    cp === CODE_POINTS.HYPHEN_MINUS ? (this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = State.SCRIPT_DATA, this._stateScriptData(cp));
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(cp);
    }
  }
  // Script data escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this.state = State.SCRIPT_DATA_ESCAPED, this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = State.SCRIPT_DATA_ESCAPED, this._emitCodePoint(cp);
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this.state = State.SCRIPT_DATA_ESCAPED, this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = State.SCRIPT_DATA_ESCAPED, this._emitCodePoint(cp);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(cp) {
    cp === CODE_POINTS.SOLIDUS ? this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : isAsciiLetter(cp) ? (this._emitChars("<"), this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(cp)) : (this._emitChars("<"), this.state = State.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(cp));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(cp) {
    isAsciiLetter(cp) ? (this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(cp)) : (this._emitChars("</"), this.state = State.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(cp));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(cp) {
    this.handleSpecialEndTag(cp) && (this._emitChars("</"), this.state = State.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(cp));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(cp) {
    if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, !1) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(cp);
      for (let i = 0; i < SEQUENCES.SCRIPT.length; i++)
        this._emitCodePoint(this._consume());
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else this._ensureHibernation() || (this.state = State.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(cp));
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(cp);
    }
  }
  // Script data double escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(cp);
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(cp);
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(cp) {
    cp === CODE_POINTS.SOLIDUS ? (this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(cp));
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(cp) {
    if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, !1) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(cp);
      for (let i = 0; i < SEQUENCES.SCRIPT.length; i++)
        this._emitCodePoint(this._consume());
      this.state = State.SCRIPT_DATA_ESCAPED;
    } else this._ensureHibernation() || (this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(cp));
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
        break;
      case CODE_POINTS.SOLIDUS:
      case CODE_POINTS.GREATER_THAN_SIGN:
      case CODE_POINTS.EOF: {
        this.state = State.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(cp);
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this._err(ERR.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = State.ATTRIBUTE_NAME;
        break;
      }
      default:
        this._createAttr(""), this.state = State.ATTRIBUTE_NAME, this._stateAttributeName(cp);
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
      case CODE_POINTS.SOLIDUS:
      case CODE_POINTS.GREATER_THAN_SIGN:
      case CODE_POINTS.EOF: {
        this._leaveAttrName(), this.state = State.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(cp);
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this._leaveAttrName(), this.state = State.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK:
      case CODE_POINTS.APOSTROPHE:
      case CODE_POINTS.LESS_THAN_SIGN: {
        this._err(ERR.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(cp);
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this.currentAttr.name += REPLACEMENT_CHARACTER;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
        break;
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this.state = State.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA, this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._createAttr(""), this.state = State.ATTRIBUTE_NAME, this._stateAttributeName(cp);
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
        break;
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingAttributeValue), this.state = State.DATA, this.emitCurrentTagToken();
        break;
      }
      default:
        this.state = State.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(cp);
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(cp);
    }
  }
  // Attribute value (single-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueSingleQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(cp);
    }
  }
  // Attribute value (unquoted) state
  //------------------------------------------------------------------
  _stateAttributeValueUnquoted(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue(), this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = State.DATA, this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK:
      case CODE_POINTS.APOSTROPHE:
      case CODE_POINTS.LESS_THAN_SIGN:
      case CODE_POINTS.EQUALS_SIGN:
      case CODE_POINTS.GRAVE_ACCENT: {
        this._err(ERR.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(cp);
    }
  }
  // After attribute value (quoted) state
  //------------------------------------------------------------------
  _stateAfterAttributeValueQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue(), this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this._leaveAttrValue(), this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = State.DATA, this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(ERR.missingWhitespaceBetweenAttributes), this.state = State.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(cp);
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(cp) {
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        let token = this.currentToken;
        token.selfClosing = !0, this.state = State.DATA, this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(ERR.unexpectedSolidusInTag), this.state = State.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(cp);
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA, this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this.emitCurrentComment(token), this._emitEOFToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), token.data += REPLACEMENT_CHARACTER;
        break;
      }
      default:
        token.data += String.fromCodePoint(cp);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(cp) {
    this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, !0) ? (this._createCommentToken(SEQUENCES.DASH_DASH.length + 1), this.state = State.COMMENT_START) : this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1), this.state = State.DOCTYPE) : this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, !0) ? this.inForeignNode ? this.state = State.CDATA_SECTION : (this._err(ERR.cdataInHtmlContent), this._createCommentToken(SEQUENCES.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = State.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(ERR.incorrectlyOpenedComment), this._createCommentToken(2), this.state = State.BOGUS_COMMENT, this._stateBogusComment(cp));
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_START_DASH;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptClosingOfEmptyComment), this.state = State.DATA;
        let token = this.currentToken;
        this.emitCurrentComment(token);
        break;
      }
      default:
        this.state = State.COMMENT, this._stateComment(cp);
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptClosingOfEmptyComment), this.state = State.DATA, this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment), this.emitCurrentComment(token), this._emitEOFToken();
        break;
      }
      default:
        token.data += "-", this.state = State.COMMENT, this._stateComment(cp);
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END_DASH;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        token.data += "<", this.state = State.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), token.data += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment), this.emitCurrentComment(token), this._emitEOFToken();
        break;
      }
      default:
        token.data += String.fromCodePoint(cp);
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.EXCLAMATION_MARK: {
        token.data += "!", this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        token.data += "<";
        break;
      }
      default:
        this.state = State.COMMENT, this._stateComment(cp);
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(cp) {
    cp === CODE_POINTS.HYPHEN_MINUS ? this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = State.COMMENT, this._stateComment(cp));
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(cp) {
    cp === CODE_POINTS.HYPHEN_MINUS ? this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = State.COMMENT_END_DASH, this._stateCommentEndDash(cp));
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(cp) {
    cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF && this._err(ERR.nestedComment), this.state = State.COMMENT_END, this._stateCommentEnd(cp);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment), this.emitCurrentComment(token), this._emitEOFToken();
        break;
      }
      default:
        token.data += "-", this.state = State.COMMENT, this._stateComment(cp);
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA, this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EXCLAMATION_MARK: {
        this.state = State.COMMENT_END_BANG;
        break;
      }
      case CODE_POINTS.HYPHEN_MINUS: {
        token.data += "-";
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment), this.emitCurrentComment(token), this._emitEOFToken();
        break;
      }
      default:
        token.data += "--", this.state = State.COMMENT, this._stateComment(cp);
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        token.data += "--!", this.state = State.COMMENT_END_DASH;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.incorrectlyClosedComment), this.state = State.DATA, this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment), this.emitCurrentComment(token), this._emitEOFToken();
        break;
      }
      default:
        token.data += "--!", this.state = State.COMMENT, this._stateComment(cp);
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_NAME;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), this._createDoctypeToken(null);
        let token = this.currentToken;
        token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        this._err(ERR.missingWhitespaceBeforeDoctypeName), this.state = State.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(cp);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(cp) {
    if (isAsciiUpper(cp))
      this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp))), this.state = State.DOCTYPE_NAME;
    else
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED:
          break;
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter), this._createDoctypeToken(REPLACEMENT_CHARACTER), this.state = State.DOCTYPE_NAME;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypeName), this._createDoctypeToken(null);
          let token = this.currentToken;
          token.forceQuirks = !0, this.emitCurrentDoctype(token), this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype), this._createDoctypeToken(null);
          let token = this.currentToken;
          token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(cp)), this.state = State.DOCTYPE_NAME;
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.AFTER_DOCTYPE_NAME;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA, this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), token.name += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        token.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
        break;
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA, this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, !1) ? this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, !1) ? this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(ERR.invalidCharacterSequenceAfterDoctypeName), token.forceQuirks = !0, this.state = State.BOGUS_DOCTYPE, this._stateBogusDoctype(cp));
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword), token.publicId = "", this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword), token.publicId = "", this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypePublicIdentifier), token.forceQuirks = !0, this.state = State.DATA, this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier), token.forceQuirks = !0, this.state = State.BOGUS_DOCTYPE, this._stateBogusDoctype(cp);
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
        break;
      case CODE_POINTS.QUOTATION_MARK: {
        token.publicId = "", this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.publicId = "", this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypePublicIdentifier), token.forceQuirks = !0, this.state = State.DATA, this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier), token.forceQuirks = !0, this.state = State.BOGUS_DOCTYPE, this._stateBogusDoctype(cp);
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), token.publicId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypePublicIdentifier), token.forceQuirks = !0, this.emitCurrentDoctype(token), this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        token.publicId += String.fromCodePoint(cp);
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), token.publicId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypePublicIdentifier), token.forceQuirks = !0, this.emitCurrentDoctype(token), this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        token.publicId += String.fromCodePoint(cp);
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA, this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), token.systemId = "", this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), token.systemId = "", this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier), token.forceQuirks = !0, this.state = State.BOGUS_DOCTYPE, this._stateBogusDoctype(cp);
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
        break;
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token), this.state = State.DATA;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token.systemId = "", this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.systemId = "", this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier), token.forceQuirks = !0, this.state = State.BOGUS_DOCTYPE, this._stateBogusDoctype(cp);
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword), token.systemId = "", this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword), token.systemId = "", this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypeSystemIdentifier), token.forceQuirks = !0, this.state = State.DATA, this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier), token.forceQuirks = !0, this.state = State.BOGUS_DOCTYPE, this._stateBogusDoctype(cp);
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
        break;
      case CODE_POINTS.QUOTATION_MARK: {
        token.systemId = "", this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.systemId = "", this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypeSystemIdentifier), token.forceQuirks = !0, this.state = State.DATA, this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier), token.forceQuirks = !0, this.state = State.BOGUS_DOCTYPE, this._stateBogusDoctype(cp);
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), token.systemId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypeSystemIdentifier), token.forceQuirks = !0, this.emitCurrentDoctype(token), this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        token.systemId += String.fromCodePoint(cp);
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter), token.systemId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypeSystemIdentifier), token.forceQuirks = !0, this.emitCurrentDoctype(token), this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        token.systemId += String.fromCodePoint(cp);
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
        break;
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token), this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype), token.forceQuirks = !0, this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
        this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = State.BOGUS_DOCTYPE, this._stateBogusDoctype(cp);
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(cp) {
    let token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token), this.state = State.DATA;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        break;
      }
      case CODE_POINTS.EOF: {
        this.emitCurrentDoctype(token), this._emitEOFToken();
        break;
      }
      default:
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(cp) {
    switch (cp) {
      case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this.state = State.CDATA_SECTION_BRACKET;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(cp);
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(cp) {
    cp === CODE_POINTS.RIGHT_SQUARE_BRACKET ? this.state = State.CDATA_SECTION_END : (this._emitChars("]"), this.state = State.CDATA_SECTION, this._stateCdataSection(cp));
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(cp) {
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default:
        this._emitChars("]]"), this.state = State.CDATA_SECTION, this._stateCdataSection(cp);
    }
  }
  // Character reference state
  //------------------------------------------------------------------
  _stateCharacterReference() {
    let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
    if (length < 0)
      if (this.preprocessor.lastChunkWritten)
        length = this.entityDecoder.end();
      else {
        this.active = !1, this.preprocessor.pos = this.preprocessor.html.length - 1, this.consumedAfterSnapshot = 0, this.preprocessor.endOfChunkHit = !0;
        return;
      }
    length === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric2(this.preprocessor.peek(1)) ? State.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(cp) {
    isAsciiAlphaNumeric2(cp) ? this._flushCodePointConsumedAsCharacterReference(cp) : (cp === CODE_POINTS.SEMICOLON && this._err(ERR.unknownNamedCharacterReference), this.state = this.returnState, this._callState(cp));
  }
};

// node_modules/parse5/dist/parser/open-element-stack.js
var IMPLICIT_END_TAG_REQUIRED = /* @__PURE__ */ new Set([TAG_ID.DD, TAG_ID.DT, TAG_ID.LI, TAG_ID.OPTGROUP, TAG_ID.OPTION, TAG_ID.P, TAG_ID.RB, TAG_ID.RP, TAG_ID.RT, TAG_ID.RTC]), IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = /* @__PURE__ */ new Set([
  ...IMPLICIT_END_TAG_REQUIRED,
  TAG_ID.CAPTION,
  TAG_ID.COLGROUP,
  TAG_ID.TBODY,
  TAG_ID.TD,
  TAG_ID.TFOOT,
  TAG_ID.TH,
  TAG_ID.THEAD,
  TAG_ID.TR
]), SCOPING_ELEMENTS_HTML = /* @__PURE__ */ new Set([
  TAG_ID.APPLET,
  TAG_ID.CAPTION,
  TAG_ID.HTML,
  TAG_ID.MARQUEE,
  TAG_ID.OBJECT,
  TAG_ID.TABLE,
  TAG_ID.TD,
  TAG_ID.TEMPLATE,
  TAG_ID.TH
]), SCOPING_ELEMENTS_HTML_LIST = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.OL, TAG_ID.UL]), SCOPING_ELEMENTS_HTML_BUTTON = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.BUTTON]), SCOPING_ELEMENTS_MATHML = /* @__PURE__ */ new Set([TAG_ID.ANNOTATION_XML, TAG_ID.MI, TAG_ID.MN, TAG_ID.MO, TAG_ID.MS, TAG_ID.MTEXT]), SCOPING_ELEMENTS_SVG = /* @__PURE__ */ new Set([TAG_ID.DESC, TAG_ID.FOREIGN_OBJECT, TAG_ID.TITLE]), TABLE_ROW_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TR, TAG_ID.TEMPLATE, TAG_ID.HTML]), TABLE_BODY_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TEMPLATE, TAG_ID.HTML]), TABLE_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TEMPLATE, TAG_ID.HTML]), TABLE_CELLS = /* @__PURE__ */ new Set([TAG_ID.TD, TAG_ID.TH]), OpenElementStack = class {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(document, treeAdapter, handler) {
    this.treeAdapter = treeAdapter, this.handler = handler, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = TAG_ID.UNKNOWN, this.current = document;
  }
  //Index of element
  _indexOf(element) {
    return this.items.lastIndexOf(element, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(element, tagID) {
    this.stackTop++, this.items[this.stackTop] = element, this.current = element, this.tagIDs[this.stackTop] = tagID, this.currentTagId = tagID, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(element, tagID, !0);
  }
  pop() {
    let popped = this.current;
    this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(popped, !0);
  }
  replace(oldElement, newElement) {
    let idx = this._indexOf(oldElement);
    this.items[idx] = newElement, idx === this.stackTop && (this.current = newElement);
  }
  insertAfter(referenceElement, newElement, newElementID) {
    let insertionIdx = this._indexOf(referenceElement) + 1;
    this.items.splice(insertionIdx, 0, newElement), this.tagIDs.splice(insertionIdx, 0, newElementID), this.stackTop++, insertionIdx === this.stackTop && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
  }
  popUntilTagNamePopped(tagName) {
    let targetIdx = this.stackTop + 1;
    do
      targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
    while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
    this.shortenToLength(Math.max(targetIdx, 0));
  }
  shortenToLength(idx) {
    for (; this.stackTop >= idx; ) {
      let popped = this.current;
      this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(popped, this.stackTop < idx);
    }
  }
  popUntilElementPopped(element) {
    let idx = this._indexOf(element);
    this.shortenToLength(Math.max(idx, 0));
  }
  popUntilPopped(tagNames, targetNS) {
    let idx = this._indexOfTagNames(tagNames, targetNS);
    this.shortenToLength(Math.max(idx, 0));
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(NUMBERED_HEADERS, NS.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(TABLE_CELLS, NS.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1);
  }
  _indexOfTagNames(tagNames, namespace) {
    for (let i = this.stackTop; i >= 0; i--)
      if (tagNames.has(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace)
        return i;
    return -1;
  }
  clearBackTo(tagNames, targetNS) {
    let idx = this._indexOfTagNames(tagNames, targetNS);
    this.shortenToLength(idx + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(TABLE_CONTEXT, NS.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
  }
  remove(element) {
    let idx = this._indexOf(element);
    idx >= 0 && (idx === this.stackTop ? this.pop() : (this.items.splice(idx, 1), this.tagIDs.splice(idx, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(element, !1)));
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
  }
  contains(element) {
    return this._indexOf(element) > -1;
  }
  getCommonAncestor(element) {
    let elementIdx = this._indexOf(element) - 1;
    return elementIdx >= 0 ? this.items[elementIdx] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
  }
  //Element in scope
  hasInDynamicScope(tagName, htmlScope) {
    for (let i = this.stackTop; i >= 0; i--) {
      let tn = this.tagIDs[i];
      switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
        case NS.HTML: {
          if (tn === tagName)
            return !0;
          if (htmlScope.has(tn))
            return !1;
          break;
        }
        case NS.SVG: {
          if (SCOPING_ELEMENTS_SVG.has(tn))
            return !1;
          break;
        }
        case NS.MATHML: {
          if (SCOPING_ELEMENTS_MATHML.has(tn))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInScope(tagName) {
    return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
  }
  hasInListItemScope(tagName) {
    return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
  }
  hasInButtonScope(tagName) {
    return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
  }
  hasNumberedHeaderInScope() {
    for (let i = this.stackTop; i >= 0; i--) {
      let tn = this.tagIDs[i];
      switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
        case NS.HTML: {
          if (NUMBERED_HEADERS.has(tn))
            return !0;
          if (SCOPING_ELEMENTS_HTML.has(tn))
            return !1;
          break;
        }
        case NS.SVG: {
          if (SCOPING_ELEMENTS_SVG.has(tn))
            return !1;
          break;
        }
        case NS.MATHML: {
          if (SCOPING_ELEMENTS_MATHML.has(tn))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInTableScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--)
      if (this.treeAdapter.getNamespaceURI(this.items[i]) === NS.HTML)
        switch (this.tagIDs[i]) {
          case tagName:
            return !0;
          case TAG_ID.TABLE:
          case TAG_ID.HTML:
            return !1;
        }
    return !0;
  }
  hasTableBodyContextInTableScope() {
    for (let i = this.stackTop; i >= 0; i--)
      if (this.treeAdapter.getNamespaceURI(this.items[i]) === NS.HTML)
        switch (this.tagIDs[i]) {
          case TAG_ID.TBODY:
          case TAG_ID.THEAD:
          case TAG_ID.TFOOT:
            return !0;
          case TAG_ID.TABLE:
          case TAG_ID.HTML:
            return !1;
        }
    return !0;
  }
  hasInSelectScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--)
      if (this.treeAdapter.getNamespaceURI(this.items[i]) === NS.HTML)
        switch (this.tagIDs[i]) {
          case tagName:
            return !0;
          case TAG_ID.OPTION:
          case TAG_ID.OPTGROUP:
            break;
          default:
            return !1;
        }
    return !0;
  }
  //Implied end tags
  generateImpliedEndTags() {
    for (; this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(exclusionId) {
    for (; this.currentTagId !== void 0 && this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId); )
      this.pop();
  }
};

// node_modules/parse5/dist/parser/formatting-element-list.js
var EntryType;
(function(EntryType2) {
  EntryType2[EntryType2.Marker = 0] = "Marker", EntryType2[EntryType2.Element = 1] = "Element";
})(EntryType || (EntryType = {}));
var MARKER = { type: EntryType.Marker }, FormattingElementList = class {
  constructor(treeAdapter) {
    this.treeAdapter = treeAdapter, this.entries = [], this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(newElement, neAttrs) {
    let candidates = [], neAttrsLength = neAttrs.length, neTagName = this.treeAdapter.getTagName(newElement), neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
    for (let i = 0; i < this.entries.length; i++) {
      let entry = this.entries[i];
      if (entry.type === EntryType.Marker)
        break;
      let { element } = entry;
      if (this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
        let elementAttrs = this.treeAdapter.getAttrList(element);
        elementAttrs.length === neAttrsLength && candidates.push({ idx: i, attrs: elementAttrs });
      }
    }
    return candidates;
  }
  _ensureNoahArkCondition(newElement) {
    if (this.entries.length < 3)
      return;
    let neAttrs = this.treeAdapter.getAttrList(newElement), candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
    if (candidates.length < 3)
      return;
    let neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value])), validCandidates = 0;
    for (let i = 0; i < candidates.length; i++) {
      let candidate = candidates[i];
      candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value) && (validCandidates += 1, validCandidates >= 3 && this.entries.splice(candidate.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(MARKER);
  }
  pushElement(element, token) {
    this._ensureNoahArkCondition(element), this.entries.unshift({
      type: EntryType.Element,
      element,
      token
    });
  }
  insertElementAfterBookmark(element, token) {
    let bookmarkIdx = this.entries.indexOf(this.bookmark);
    this.entries.splice(bookmarkIdx, 0, {
      type: EntryType.Element,
      element,
      token
    });
  }
  removeEntry(entry) {
    let entryIndex = this.entries.indexOf(entry);
    entryIndex !== -1 && this.entries.splice(entryIndex, 1);
  }
  /**
   * Clears the list of formatting elements up to the last marker.
   *
   * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
   */
  clearToLastMarker() {
    let markerIdx = this.entries.indexOf(MARKER);
    markerIdx === -1 ? this.entries.length = 0 : this.entries.splice(0, markerIdx + 1);
  }
  //Search
  getElementEntryInScopeWithTagName(tagName) {
    let entry = this.entries.find((entry2) => entry2.type === EntryType.Marker || this.treeAdapter.getTagName(entry2.element) === tagName);
    return entry && entry.type === EntryType.Element ? entry : null;
  }
  getElementEntry(element) {
    return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
  }
};

// node_modules/parse5/dist/tree-adapters/default.js
var defaultTreeAdapter = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: DOCUMENT_MODE.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(tagName, namespaceURI, attrs) {
    return {
      nodeName: tagName,
      tagName,
      attrs,
      namespaceURI,
      childNodes: [],
      parentNode: null
    };
  },
  createCommentNode(data) {
    return {
      nodeName: "#comment",
      data,
      parentNode: null
    };
  },
  createTextNode(value) {
    return {
      nodeName: "#text",
      value,
      parentNode: null
    };
  },
  //Tree mutation
  appendChild(parentNode, newNode) {
    parentNode.childNodes.push(newNode), newNode.parentNode = parentNode;
  },
  insertBefore(parentNode, newNode, referenceNode) {
    let insertionIdx = parentNode.childNodes.indexOf(referenceNode);
    parentNode.childNodes.splice(insertionIdx, 0, newNode), newNode.parentNode = parentNode;
  },
  setTemplateContent(templateElement, contentElement) {
    templateElement.content = contentElement;
  },
  getTemplateContent(templateElement) {
    return templateElement.content;
  },
  setDocumentType(document, name, publicId, systemId) {
    let doctypeNode = document.childNodes.find((node) => node.nodeName === "#documentType");
    if (doctypeNode)
      doctypeNode.name = name, doctypeNode.publicId = publicId, doctypeNode.systemId = systemId;
    else {
      let node = {
        nodeName: "#documentType",
        name,
        publicId,
        systemId,
        parentNode: null
      };
      defaultTreeAdapter.appendChild(document, node);
    }
  },
  setDocumentMode(document, mode) {
    document.mode = mode;
  },
  getDocumentMode(document) {
    return document.mode;
  },
  detachNode(node) {
    if (node.parentNode) {
      let idx = node.parentNode.childNodes.indexOf(node);
      node.parentNode.childNodes.splice(idx, 1), node.parentNode = null;
    }
  },
  insertText(parentNode, text2) {
    if (parentNode.childNodes.length > 0) {
      let prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
      if (defaultTreeAdapter.isTextNode(prevNode)) {
        prevNode.value += text2;
        return;
      }
    }
    defaultTreeAdapter.appendChild(parentNode, defaultTreeAdapter.createTextNode(text2));
  },
  insertTextBefore(parentNode, text2, referenceNode) {
    let prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
    prevNode && defaultTreeAdapter.isTextNode(prevNode) ? prevNode.value += text2 : defaultTreeAdapter.insertBefore(parentNode, defaultTreeAdapter.createTextNode(text2), referenceNode);
  },
  adoptAttributes(recipient, attrs) {
    let recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
    for (let j = 0; j < attrs.length; j++)
      recipientAttrsMap.has(attrs[j].name) || recipient.attrs.push(attrs[j]);
  },
  //Tree traversing
  getFirstChild(node) {
    return node.childNodes[0];
  },
  getChildNodes(node) {
    return node.childNodes;
  },
  getParentNode(node) {
    return node.parentNode;
  },
  getAttrList(element) {
    return element.attrs;
  },
  //Node data
  getTagName(element) {
    return element.tagName;
  },
  getNamespaceURI(element) {
    return element.namespaceURI;
  },
  getTextNodeContent(textNode) {
    return textNode.value;
  },
  getCommentNodeContent(commentNode) {
    return commentNode.data;
  },
  getDocumentTypeNodeName(doctypeNode) {
    return doctypeNode.name;
  },
  getDocumentTypeNodePublicId(doctypeNode) {
    return doctypeNode.publicId;
  },
  getDocumentTypeNodeSystemId(doctypeNode) {
    return doctypeNode.systemId;
  },
  //Node types
  isTextNode(node) {
    return node.nodeName === "#text";
  },
  isCommentNode(node) {
    return node.nodeName === "#comment";
  },
  isDocumentTypeNode(node) {
    return node.nodeName === "#documentType";
  },
  isElementNode(node) {
    return Object.prototype.hasOwnProperty.call(node, "tagName");
  },
  // Source code location
  setNodeSourceCodeLocation(node, location) {
    node.sourceCodeLocation = location;
  },
  getNodeSourceCodeLocation(node) {
    return node.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(node, endLocation) {
    node.sourceCodeLocation = { ...node.sourceCodeLocation, ...endLocation };
  }
};

// node_modules/parse5/dist/common/doctype.js
var VALID_DOCTYPE_NAME = "html", VALID_SYSTEM_ID = "about:legacy-compat", QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
], QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  ...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], QUIRKS_MODE_PUBLIC_IDS = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function hasPrefix(publicId, prefixes) {
  return prefixes.some((prefix) => publicId.startsWith(prefix));
}
function isConforming(token) {
  return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
}
function getDocumentMode(token) {
  if (token.name !== VALID_DOCTYPE_NAME)
    return DOCUMENT_MODE.QUIRKS;
  let { systemId } = token;
  if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID)
    return DOCUMENT_MODE.QUIRKS;
  let { publicId } = token;
  if (publicId !== null) {
    if (publicId = publicId.toLowerCase(), QUIRKS_MODE_PUBLIC_IDS.has(publicId))
      return DOCUMENT_MODE.QUIRKS;
    let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
    if (hasPrefix(publicId, prefixes))
      return DOCUMENT_MODE.QUIRKS;
    if (prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES, hasPrefix(publicId, prefixes))
      return DOCUMENT_MODE.LIMITED_QUIRKS;
  }
  return DOCUMENT_MODE.NO_QUIRKS;
}

// node_modules/parse5/dist/common/foreign-content.js
var MIME_TYPES = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, DEFINITION_URL_ATTR = "definitionurl", ADJUSTED_DEFINITION_URL_ATTR = "definitionURL", SVG_ATTRS_ADJUSTMENT_MAP = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((attr) => [attr.toLowerCase(), attr])), XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: NS.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: NS.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: NS.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: NS.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: NS.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: NS.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: NS.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: NS.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: NS.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: NS.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: NS.XMLNS }]
]), SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((tn) => [tn.toLowerCase(), tn])), EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
  TAG_ID.B,
  TAG_ID.BIG,
  TAG_ID.BLOCKQUOTE,
  TAG_ID.BODY,
  TAG_ID.BR,
  TAG_ID.CENTER,
  TAG_ID.CODE,
  TAG_ID.DD,
  TAG_ID.DIV,
  TAG_ID.DL,
  TAG_ID.DT,
  TAG_ID.EM,
  TAG_ID.EMBED,
  TAG_ID.H1,
  TAG_ID.H2,
  TAG_ID.H3,
  TAG_ID.H4,
  TAG_ID.H5,
  TAG_ID.H6,
  TAG_ID.HEAD,
  TAG_ID.HR,
  TAG_ID.I,
  TAG_ID.IMG,
  TAG_ID.LI,
  TAG_ID.LISTING,
  TAG_ID.MENU,
  TAG_ID.META,
  TAG_ID.NOBR,
  TAG_ID.OL,
  TAG_ID.P,
  TAG_ID.PRE,
  TAG_ID.RUBY,
  TAG_ID.S,
  TAG_ID.SMALL,
  TAG_ID.SPAN,
  TAG_ID.STRONG,
  TAG_ID.STRIKE,
  TAG_ID.SUB,
  TAG_ID.SUP,
  TAG_ID.TABLE,
  TAG_ID.TT,
  TAG_ID.U,
  TAG_ID.UL,
  TAG_ID.VAR
]);
function causesExit(startTagToken) {
  let tn = startTagToken.tagID;
  return tn === TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE) || EXITS_FOREIGN_CONTENT.has(tn);
}
function adjustTokenMathMLAttrs(token) {
  for (let i = 0; i < token.attrs.length; i++)
    if (token.attrs[i].name === DEFINITION_URL_ATTR) {
      token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
      break;
    }
}
function adjustTokenSVGAttrs(token) {
  for (let i = 0; i < token.attrs.length; i++) {
    let adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
    adjustedAttrName != null && (token.attrs[i].name = adjustedAttrName);
  }
}
function adjustTokenXMLAttrs(token) {
  for (let i = 0; i < token.attrs.length; i++) {
    let adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
    adjustedAttrEntry && (token.attrs[i].prefix = adjustedAttrEntry.prefix, token.attrs[i].name = adjustedAttrEntry.name, token.attrs[i].namespace = adjustedAttrEntry.namespace);
  }
}
function adjustTokenSVGTagName(token) {
  let adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
  adjustedTagName != null && (token.tagName = adjustedTagName, token.tagID = getTagID(token.tagName));
}
function isMathMLTextIntegrationPoint(tn, ns) {
  return ns === NS.MATHML && (tn === TAG_ID.MI || tn === TAG_ID.MO || tn === TAG_ID.MN || tn === TAG_ID.MS || tn === TAG_ID.MTEXT);
}
function isHtmlIntegrationPoint(tn, ns, attrs) {
  if (ns === NS.MATHML && tn === TAG_ID.ANNOTATION_XML) {
    for (let i = 0; i < attrs.length; i++)
      if (attrs[i].name === ATTRS.ENCODING) {
        let value = attrs[i].value.toLowerCase();
        return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
      }
  }
  return ns === NS.SVG && (tn === TAG_ID.FOREIGN_OBJECT || tn === TAG_ID.DESC || tn === TAG_ID.TITLE);
}
function isIntegrationPoint(tn, ns, attrs, foreignNS) {
  return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns);
}

// node_modules/parse5/dist/parser/index.js
var HIDDEN_INPUT_TYPE = "hidden", AA_OUTER_LOOP_ITER = 8, AA_INNER_LOOP_ITER = 3, InsertionMode;
(function(InsertionMode2) {
  InsertionMode2[InsertionMode2.INITIAL = 0] = "INITIAL", InsertionMode2[InsertionMode2.BEFORE_HTML = 1] = "BEFORE_HTML", InsertionMode2[InsertionMode2.BEFORE_HEAD = 2] = "BEFORE_HEAD", InsertionMode2[InsertionMode2.IN_HEAD = 3] = "IN_HEAD", InsertionMode2[InsertionMode2.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", InsertionMode2[InsertionMode2.AFTER_HEAD = 5] = "AFTER_HEAD", InsertionMode2[InsertionMode2.IN_BODY = 6] = "IN_BODY", InsertionMode2[InsertionMode2.TEXT = 7] = "TEXT", InsertionMode2[InsertionMode2.IN_TABLE = 8] = "IN_TABLE", InsertionMode2[InsertionMode2.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", InsertionMode2[InsertionMode2.IN_CAPTION = 10] = "IN_CAPTION", InsertionMode2[InsertionMode2.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", InsertionMode2[InsertionMode2.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", InsertionMode2[InsertionMode2.IN_ROW = 13] = "IN_ROW", InsertionMode2[InsertionMode2.IN_CELL = 14] = "IN_CELL", InsertionMode2[InsertionMode2.IN_SELECT = 15] = "IN_SELECT", InsertionMode2[InsertionMode2.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", InsertionMode2[InsertionMode2.IN_TEMPLATE = 17] = "IN_TEMPLATE", InsertionMode2[InsertionMode2.AFTER_BODY = 18] = "AFTER_BODY", InsertionMode2[InsertionMode2.IN_FRAMESET = 19] = "IN_FRAMESET", InsertionMode2[InsertionMode2.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", InsertionMode2[InsertionMode2.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", InsertionMode2[InsertionMode2.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(InsertionMode || (InsertionMode = {}));
var BASE_LOC = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TR]), defaultParserOptions = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: defaultTreeAdapter,
  onParseError: null
}, Parser = class {
  constructor(options2, document, fragmentContext = null, scriptHandler = null) {
    this.fragmentContext = fragmentContext, this.scriptHandler = scriptHandler, this.currentToken = null, this.stopped = !1, this.insertionMode = InsertionMode.INITIAL, this.originalInsertionMode = InsertionMode.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...defaultParserOptions,
      ...options2
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = document ?? this.treeAdapter.createDocument(), this.tokenizer = new Tokenizer(this.options, this), this.activeFormattingElements = new FormattingElementList(this.treeAdapter), this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN, this._setContextModes(fragmentContext ?? this.document, this.fragmentContextID), this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
  }
  // API
  static parse(html, options2) {
    let parser = new this(options2);
    return parser.tokenizer.write(html, !0), parser.document;
  }
  static getFragmentParser(fragmentContext, options2) {
    let opts = {
      ...defaultParserOptions,
      ...options2
    };
    fragmentContext ?? (fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []));
    let documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []), parser = new this(opts, documentMock, fragmentContext);
    return parser.fragmentContextID === TAG_ID.TEMPLATE && parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE), parser._initTokenizerForFragmentParsing(), parser._insertFakeRootElement(), parser._resetInsertionMode(), parser._findFormInFragmentContext(), parser;
  }
  getFragment() {
    let rootElement = this.treeAdapter.getFirstChild(this.document), fragment = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(rootElement, fragment), fragment;
  }
  //Errors
  /** @internal */
  _err(token, code, beforeToken) {
    var _a2;
    if (!this.onParseError)
      return;
    let loc = (_a2 = token.location) !== null && _a2 !== void 0 ? _a2 : BASE_LOC, err = {
      code,
      startLine: loc.startLine,
      startCol: loc.startCol,
      startOffset: loc.startOffset,
      endLine: beforeToken ? loc.startLine : loc.endLine,
      endCol: beforeToken ? loc.startCol : loc.endCol,
      endOffset: beforeToken ? loc.startOffset : loc.endOffset
    };
    this.onParseError(err);
  }
  //Stack events
  /** @internal */
  onItemPush(node, tid, isTop) {
    var _a2, _b;
    (_b = (_a2 = this.treeAdapter).onItemPush) === null || _b === void 0 || _b.call(_a2, node), isTop && this.openElements.stackTop > 0 && this._setContextModes(node, tid);
  }
  /** @internal */
  onItemPop(node, isTop) {
    var _a2, _b;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(node, this.currentToken), (_b = (_a2 = this.treeAdapter).onItemPop) === null || _b === void 0 || _b.call(_a2, node, this.openElements.current), isTop) {
      let current, currentTagId;
      this.openElements.stackTop === 0 && this.fragmentContext ? (current = this.fragmentContext, currentTagId = this.fragmentContextID) : { current, currentTagId } = this.openElements, this._setContextModes(current, currentTagId);
    }
  }
  _setContextModes(current, tid) {
    let isHTML = current === this.document || current && this.treeAdapter.getNamespaceURI(current) === NS.HTML;
    this.currentNotInHTML = !isHTML, this.tokenizer.inForeignNode = !isHTML && current !== void 0 && tid !== void 0 && !this._isIntegrationPoint(tid, current);
  }
  /** @protected */
  _switchToTextParsing(currentToken, nextTokenizerState) {
    this._insertElement(currentToken, NS.HTML), this.tokenizer.state = nextTokenizerState, this.originalInsertionMode = this.insertionMode, this.insertionMode = InsertionMode.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = InsertionMode.TEXT, this.originalInsertionMode = InsertionMode.IN_BODY, this.tokenizer.state = TokenizerMode.PLAINTEXT;
  }
  //Fragment parsing
  /** @protected */
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  /** @protected */
  _findFormInFragmentContext() {
    let node = this.fragmentContext;
    for (; node; ) {
      if (this.treeAdapter.getTagName(node) === TAG_NAMES.FORM) {
        this.formElement = node;
        break;
      }
      node = this.treeAdapter.getParentNode(node);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML))
      switch (this.fragmentContextID) {
        case TAG_ID.TITLE:
        case TAG_ID.TEXTAREA: {
          this.tokenizer.state = TokenizerMode.RCDATA;
          break;
        }
        case TAG_ID.STYLE:
        case TAG_ID.XMP:
        case TAG_ID.IFRAME:
        case TAG_ID.NOEMBED:
        case TAG_ID.NOFRAMES:
        case TAG_ID.NOSCRIPT: {
          this.tokenizer.state = TokenizerMode.RAWTEXT;
          break;
        }
        case TAG_ID.SCRIPT: {
          this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
          break;
        }
        case TAG_ID.PLAINTEXT: {
          this.tokenizer.state = TokenizerMode.PLAINTEXT;
          break;
        }
        default:
      }
  }
  //Tree mutation
  /** @protected */
  _setDocumentType(token) {
    let name = token.name || "", publicId = token.publicId || "", systemId = token.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, name, publicId, systemId), token.location) {
      let docTypeNode = this.treeAdapter.getChildNodes(this.document).find((node) => this.treeAdapter.isDocumentTypeNode(node));
      docTypeNode && this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
    }
  }
  /** @protected */
  _attachElementToTree(element, location) {
    if (this.options.sourceCodeLocationInfo) {
      let loc = location && {
        ...location,
        startTag: location
      };
      this.treeAdapter.setNodeSourceCodeLocation(element, loc);
    }
    if (this._shouldFosterParentOnInsertion())
      this._fosterParentElement(element);
    else {
      let parent = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(parent ?? this.document, element);
    }
  }
  /**
   * For self-closing tags. Add an element to the tree, but skip adding it
   * to the stack.
   */
  /** @protected */
  _appendElement(token, namespaceURI) {
    let element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
    this._attachElementToTree(element, token.location);
  }
  /** @protected */
  _insertElement(token, namespaceURI) {
    let element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
    this._attachElementToTree(element, token.location), this.openElements.push(element, token.tagID);
  }
  /** @protected */
  _insertFakeElement(tagName, tagID) {
    let element = this.treeAdapter.createElement(tagName, NS.HTML, []);
    this._attachElementToTree(element, null), this.openElements.push(element, tagID);
  }
  /** @protected */
  _insertTemplate(token) {
    let tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs), content = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(tmpl, content), this._attachElementToTree(tmpl, token.location), this.openElements.push(tmpl, token.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(content, null);
  }
  /** @protected */
  _insertFakeRootElement() {
    let element = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(element, null), this.treeAdapter.appendChild(this.openElements.current, element), this.openElements.push(element, TAG_ID.HTML);
  }
  /** @protected */
  _appendCommentNode(token, parent) {
    let commentNode = this.treeAdapter.createCommentNode(token.data);
    this.treeAdapter.appendChild(parent, commentNode), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
  }
  /** @protected */
  _insertCharacters(token) {
    let parent, beforeElement;
    if (this._shouldFosterParentOnInsertion() ? ({ parent, beforeElement } = this._findFosterParentingLocation(), beforeElement ? this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement) : this.treeAdapter.insertText(parent, token.chars)) : (parent = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(parent, token.chars)), !token.location)
      return;
    let siblings = this.treeAdapter.getChildNodes(parent), textNodeIdx = beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length, textNode = siblings[textNodeIdx - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(textNode)) {
      let { endLine, endCol, endOffset } = token.location;
      this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
    } else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
  }
  /** @protected */
  _adoptNodes(donor, recipient) {
    for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor))
      this.treeAdapter.detachNode(child), this.treeAdapter.appendChild(recipient, child);
  }
  /** @protected */
  _setEndLocation(element, closingToken) {
    if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
      let ctLoc = closingToken.location, tn = this.treeAdapter.getTagName(element), endLoc = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        closingToken.type === TokenType.END_TAG && tn === closingToken.tagName ? {
          endTag: { ...ctLoc },
          endLine: ctLoc.endLine,
          endCol: ctLoc.endCol,
          endOffset: ctLoc.endOffset
        } : {
          endLine: ctLoc.startLine,
          endCol: ctLoc.startCol,
          endOffset: ctLoc.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(token) {
    if (!this.currentNotInHTML)
      return !1;
    let current, currentTagId;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (current = this.fragmentContext, currentTagId = this.fragmentContextID) : { current, currentTagId } = this.openElements, token.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) && currentTagId !== void 0 && !this._isIntegrationPoint(currentTagId, current, NS.HTML)
    );
  }
  /** @protected */
  _processToken(token) {
    switch (token.type) {
      case TokenType.CHARACTER: {
        this.onCharacter(token);
        break;
      }
      case TokenType.NULL_CHARACTER: {
        this.onNullCharacter(token);
        break;
      }
      case TokenType.COMMENT: {
        this.onComment(token);
        break;
      }
      case TokenType.DOCTYPE: {
        this.onDoctype(token);
        break;
      }
      case TokenType.START_TAG: {
        this._processStartTag(token);
        break;
      }
      case TokenType.END_TAG: {
        this.onEndTag(token);
        break;
      }
      case TokenType.EOF: {
        this.onEof(token);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(token);
        break;
      }
    }
  }
  //Integration points
  /** @protected */
  _isIntegrationPoint(tid, element, foreignNS) {
    let ns = this.treeAdapter.getNamespaceURI(element), attrs = this.treeAdapter.getAttrList(element);
    return isIntegrationPoint(tid, ns, attrs, foreignNS);
  }
  //Active formatting elements reconstruction
  /** @protected */
  _reconstructActiveFormattingElements() {
    let listLength = this.activeFormattingElements.entries.length;
    if (listLength) {
      let endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element)), unopenIdx = endIndex === -1 ? listLength - 1 : endIndex - 1;
      for (let i = unopenIdx; i >= 0; i--) {
        let entry = this.activeFormattingElements.entries[i];
        this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element)), entry.element = this.openElements.current;
      }
    }
  }
  //Close elements
  /** @protected */
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = InsertionMode.IN_ROW;
  }
  /** @protected */
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P), this.openElements.popUntilTagNamePopped(TAG_ID.P);
  }
  //Insertion modes
  /** @protected */
  _resetInsertionMode() {
    for (let i = this.openElements.stackTop; i >= 0; i--)
      switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
        case TAG_ID.TR: {
          this.insertionMode = InsertionMode.IN_ROW;
          return;
        }
        case TAG_ID.TBODY:
        case TAG_ID.THEAD:
        case TAG_ID.TFOOT: {
          this.insertionMode = InsertionMode.IN_TABLE_BODY;
          return;
        }
        case TAG_ID.CAPTION: {
          this.insertionMode = InsertionMode.IN_CAPTION;
          return;
        }
        case TAG_ID.COLGROUP: {
          this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
          return;
        }
        case TAG_ID.TABLE: {
          this.insertionMode = InsertionMode.IN_TABLE;
          return;
        }
        case TAG_ID.BODY: {
          this.insertionMode = InsertionMode.IN_BODY;
          return;
        }
        case TAG_ID.FRAMESET: {
          this.insertionMode = InsertionMode.IN_FRAMESET;
          return;
        }
        case TAG_ID.SELECT: {
          this._resetInsertionModeForSelect(i);
          return;
        }
        case TAG_ID.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case TAG_ID.HTML: {
          this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
          return;
        }
        case TAG_ID.TD:
        case TAG_ID.TH: {
          if (i > 0) {
            this.insertionMode = InsertionMode.IN_CELL;
            return;
          }
          break;
        }
        case TAG_ID.HEAD: {
          if (i > 0) {
            this.insertionMode = InsertionMode.IN_HEAD;
            return;
          }
          break;
        }
      }
    this.insertionMode = InsertionMode.IN_BODY;
  }
  /** @protected */
  _resetInsertionModeForSelect(selectIdx) {
    if (selectIdx > 0)
      for (let i = selectIdx - 1; i > 0; i--) {
        let tn = this.openElements.tagIDs[i];
        if (tn === TAG_ID.TEMPLATE)
          break;
        if (tn === TAG_ID.TABLE) {
          this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
          return;
        }
      }
    this.insertionMode = InsertionMode.IN_SELECT;
  }
  //Foster parenting
  /** @protected */
  _isElementCausesFosterParenting(tn) {
    return TABLE_STRUCTURE_TAGS.has(tn);
  }
  /** @protected */
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  /** @protected */
  _findFosterParentingLocation() {
    for (let i = this.openElements.stackTop; i >= 0; i--) {
      let openElement = this.openElements.items[i];
      switch (this.openElements.tagIDs[i]) {
        case TAG_ID.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML)
            return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
          break;
        }
        case TAG_ID.TABLE: {
          let parent = this.treeAdapter.getParentNode(openElement);
          return parent ? { parent, beforeElement: openElement } : { parent: this.openElements.items[i - 1], beforeElement: null };
        }
        default:
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  /** @protected */
  _fosterParentElement(element) {
    let location = this._findFosterParentingLocation();
    location.beforeElement ? this.treeAdapter.insertBefore(location.parent, element, location.beforeElement) : this.treeAdapter.appendChild(location.parent, element);
  }
  //Special elements
  /** @protected */
  _isSpecialElement(element, id) {
    let ns = this.treeAdapter.getNamespaceURI(element);
    return SPECIAL_ELEMENTS[ns].has(id);
  }
  /** @internal */
  onCharacter(token) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      characterInForeignContent(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE: {
        characterInBody(this, token);
        break;
      }
      case InsertionMode.TEXT:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        characterInTableText(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onNullCharacter(token) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      nullCharacterInForeignContent(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onComment(token) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      appendComment(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL:
      case InsertionMode.BEFORE_HTML:
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        appendComment(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        appendCommentToRootHtmlElement(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        appendCommentToDocument(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onDoctype(token) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case InsertionMode.INITIAL: {
        doctypeInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD: {
        this._err(token, ERR.misplacedDoctype);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onStartTag(token) {
    this.skipNextNewLine = !1, this.currentToken = token, this._processStartTag(token), token.selfClosing && !token.ackSelfClosing && this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
  }
  /**
   * Processes a given start tag.
   *
   * `onStartTag` checks if a self-closing tag was recognized. When a token
   * is moved inbetween multiple insertion modes, this check for self-closing
   * could lead to false positives. To avoid this, `_processStartTag` is used
   * for nested calls.
   *
   * @param token The token to process.
   * @protected
   */
  _processStartTag(token) {
    this.shouldProcessStartTagTokenInForeignContent(token) ? startTagInForeignContent(this, token) : this._startTagOutsideForeignContent(token);
  }
  /** @protected */
  _startTagOutsideForeignContent(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        startTagBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        startTagBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        startTagInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        startTagInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        startTagAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY: {
        startTagInBody(this, token);
        break;
      }
      case InsertionMode.IN_TABLE: {
        startTagInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        startTagInCaption(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        startTagInColumnGroup(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        startTagInTableBody(this, token);
        break;
      }
      case InsertionMode.IN_ROW: {
        startTagInRow(this, token);
        break;
      }
      case InsertionMode.IN_CELL: {
        startTagInCell(this, token);
        break;
      }
      case InsertionMode.IN_SELECT: {
        startTagInSelect(this, token);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        startTagInSelectInTable(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        startTagInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        startTagAfterBody(this, token);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        startTagInFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        startTagAfterFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        startTagAfterAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        startTagAfterAfterFrameset(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onEndTag(token) {
    this.skipNextNewLine = !1, this.currentToken = token, this.currentNotInHTML ? endTagInForeignContent(this, token) : this._endTagOutsideForeignContent(token);
  }
  /** @protected */
  _endTagOutsideForeignContent(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        endTagBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        endTagBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        endTagInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        endTagInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        endTagAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY: {
        endTagInBody(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        endTagInText(this, token);
        break;
      }
      case InsertionMode.IN_TABLE: {
        endTagInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        endTagInCaption(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        endTagInColumnGroup(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        endTagInTableBody(this, token);
        break;
      }
      case InsertionMode.IN_ROW: {
        endTagInRow(this, token);
        break;
      }
      case InsertionMode.IN_CELL: {
        endTagInCell(this, token);
        break;
      }
      case InsertionMode.IN_SELECT: {
        endTagInSelect(this, token);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        endTagInSelectInTable(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        endTagInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        endTagAfterBody(this, token);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        endTagInFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        endTagAfterFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onEof(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        eofInBody(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        eofInText(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        eofInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        stopParsing(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onWhitespaceCharacter(token) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED)) {
      if (token.chars.length === 1)
        return;
      token.chars = token.chars.substr(1);
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.TEXT:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.AFTER_BODY:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        whitespaceCharacterInBody(this, token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        whitespaceCharacterInTableText(this, token);
        break;
      }
      default:
    }
  }
};
function aaObtainFormattingElementEntry(p, token) {
  let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
  return formattingElementEntry ? p.openElements.contains(formattingElementEntry.element) ? p.openElements.hasInScope(token.tagID) || (formattingElementEntry = null) : (p.activeFormattingElements.removeEntry(formattingElementEntry), formattingElementEntry = null) : genericEndTagInBody(p, token), formattingElementEntry;
}
function aaObtainFurthestBlock(p, formattingElementEntry) {
  let furthestBlock = null, idx = p.openElements.stackTop;
  for (; idx >= 0; idx--) {
    let element = p.openElements.items[idx];
    if (element === formattingElementEntry.element)
      break;
    p._isSpecialElement(element, p.openElements.tagIDs[idx]) && (furthestBlock = element);
  }
  return furthestBlock || (p.openElements.shortenToLength(Math.max(idx, 0)), p.activeFormattingElements.removeEntry(formattingElementEntry)), furthestBlock;
}
function aaInnerLoop(p, furthestBlock, formattingElement) {
  let lastElement = furthestBlock, nextElement = p.openElements.getCommonAncestor(furthestBlock);
  for (let i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
    nextElement = p.openElements.getCommonAncestor(element);
    let elementEntry = p.activeFormattingElements.getElementEntry(element), counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
    !elementEntry || counterOverflow ? (counterOverflow && p.activeFormattingElements.removeEntry(elementEntry), p.openElements.remove(element)) : (element = aaRecreateElementFromEntry(p, elementEntry), lastElement === furthestBlock && (p.activeFormattingElements.bookmark = elementEntry), p.treeAdapter.detachNode(lastElement), p.treeAdapter.appendChild(element, lastElement), lastElement = element);
  }
  return lastElement;
}
function aaRecreateElementFromEntry(p, elementEntry) {
  let ns = p.treeAdapter.getNamespaceURI(elementEntry.element), newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
  return p.openElements.replace(elementEntry.element, newElement), elementEntry.element = newElement, newElement;
}
function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
  let tn = p.treeAdapter.getTagName(commonAncestor), tid = getTagID(tn);
  if (p._isElementCausesFosterParenting(tid))
    p._fosterParentElement(lastElement);
  else {
    let ns = p.treeAdapter.getNamespaceURI(commonAncestor);
    tid === TAG_ID.TEMPLATE && ns === NS.HTML && (commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor)), p.treeAdapter.appendChild(commonAncestor, lastElement);
  }
}
function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
  let ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element), { token } = formattingElementEntry, newElement = p.treeAdapter.createElement(token.tagName, ns, token.attrs);
  p._adoptNodes(furthestBlock, newElement), p.treeAdapter.appendChild(furthestBlock, newElement), p.activeFormattingElements.insertElementAfterBookmark(newElement, token), p.activeFormattingElements.removeEntry(formattingElementEntry), p.openElements.remove(formattingElementEntry.element), p.openElements.insertAfter(furthestBlock, newElement, token.tagID);
}
function callAdoptionAgency(p, token) {
  for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
    let formattingElementEntry = aaObtainFormattingElementEntry(p, token);
    if (!formattingElementEntry)
      break;
    let furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
    if (!furthestBlock)
      break;
    p.activeFormattingElements.bookmark = formattingElementEntry;
    let lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element), commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
    p.treeAdapter.detachNode(lastElement), commonAncestor && aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement), aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
  }
}
function appendComment(p, token) {
  p._appendCommentNode(token, p.openElements.currentTmplContentOrNode);
}
function appendCommentToRootHtmlElement(p, token) {
  p._appendCommentNode(token, p.openElements.items[0]);
}
function appendCommentToDocument(p, token) {
  p._appendCommentNode(token, p.document);
}
function stopParsing(p, token) {
  if (p.stopped = !0, token.location) {
    let target = p.fragmentContext ? 0 : 2;
    for (let i = p.openElements.stackTop; i >= target; i--)
      p._setEndLocation(p.openElements.items[i], token);
    if (!p.fragmentContext && p.openElements.stackTop >= 0) {
      let htmlElement = p.openElements.items[0], htmlLocation = p.treeAdapter.getNodeSourceCodeLocation(htmlElement);
      if (htmlLocation && !htmlLocation.endTag && (p._setEndLocation(htmlElement, token), p.openElements.stackTop >= 1)) {
        let bodyElement = p.openElements.items[1], bodyLocation = p.treeAdapter.getNodeSourceCodeLocation(bodyElement);
        bodyLocation && !bodyLocation.endTag && p._setEndLocation(bodyElement, token);
      }
    }
  }
}
function doctypeInInitialMode(p, token) {
  p._setDocumentType(token);
  let mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
  isConforming(token) || p._err(token, ERR.nonConformingDoctype), p.treeAdapter.setDocumentMode(p.document, mode), p.insertionMode = InsertionMode.BEFORE_HTML;
}
function tokenInInitialMode(p, token) {
  p._err(token, ERR.missingDoctype, !0), p.treeAdapter.setDocumentMode(p.document, DOCUMENT_MODE.QUIRKS), p.insertionMode = InsertionMode.BEFORE_HTML, p._processToken(token);
}
function startTagBeforeHtml(p, token) {
  token.tagID === TAG_ID.HTML ? (p._insertElement(token, NS.HTML), p.insertionMode = InsertionMode.BEFORE_HEAD) : tokenBeforeHtml(p, token);
}
function endTagBeforeHtml(p, token) {
  let tn = token.tagID;
  (tn === TAG_ID.HTML || tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.BR) && tokenBeforeHtml(p, token);
}
function tokenBeforeHtml(p, token) {
  p._insertFakeRootElement(), p.insertionMode = InsertionMode.BEFORE_HEAD, p._processToken(token);
}
function startTagBeforeHead(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.HEAD: {
      p._insertElement(token, NS.HTML), p.headElement = p.openElements.current, p.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    default:
      tokenBeforeHead(p, token);
  }
}
function endTagBeforeHead(p, token) {
  let tn = token.tagID;
  tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.HTML || tn === TAG_ID.BR ? tokenBeforeHead(p, token) : p._err(token, ERR.endTagWithoutMatchingOpenElement);
}
function tokenBeforeHead(p, token) {
  p._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD), p.headElement = p.openElements.current, p.insertionMode = InsertionMode.IN_HEAD, p._processToken(token);
}
function startTagInHead(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META: {
      p._appendElement(token, NS.HTML), token.ackSelfClosing = !0;
      break;
    }
    case TAG_ID.TITLE: {
      p._switchToTextParsing(token, TokenizerMode.RCDATA);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      p.options.scriptingEnabled ? p._switchToTextParsing(token, TokenizerMode.RAWTEXT) : (p._insertElement(token, NS.HTML), p.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT);
      break;
    }
    case TAG_ID.NOFRAMES:
    case TAG_ID.STYLE: {
      p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
      break;
    }
    case TAG_ID.SCRIPT: {
      p._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
      break;
    }
    case TAG_ID.TEMPLATE: {
      p._insertTemplate(token), p.activeFormattingElements.insertMarker(), p.framesetOk = !1, p.insertionMode = InsertionMode.IN_TEMPLATE, p.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
      break;
    }
    case TAG_ID.HEAD: {
      p._err(token, ERR.misplacedStartTagForHeadElement);
      break;
    }
    default:
      tokenInHead(p, token);
  }
}
function endTagInHead(p, token) {
  switch (token.tagID) {
    case TAG_ID.HEAD: {
      p.openElements.pop(), p.insertionMode = InsertionMode.AFTER_HEAD;
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.BR:
    case TAG_ID.HTML: {
      tokenInHead(p, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    default:
      p._err(token, ERR.endTagWithoutMatchingOpenElement);
  }
}
function templateEndTagInHead(p, token) {
  p.openElements.tmplCount > 0 ? (p.openElements.generateImpliedEndTagsThoroughly(), p.openElements.currentTagId !== TAG_ID.TEMPLATE && p._err(token, ERR.closingOfElementWithOpenChildElements), p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE), p.activeFormattingElements.clearToLastMarker(), p.tmplInsertionModeStack.shift(), p._resetInsertionMode()) : p._err(token, ERR.endTagWithoutMatchingOpenElement);
}
function tokenInHead(p, token) {
  p.openElements.pop(), p.insertionMode = InsertionMode.AFTER_HEAD, p._processToken(token);
}
function startTagInHeadNoScript(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.HEAD:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.STYLE: {
      startTagInHead(p, token);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      p._err(token, ERR.nestedNoscriptInHead);
      break;
    }
    default:
      tokenInHeadNoScript(p, token);
  }
}
function endTagInHeadNoScript(p, token) {
  switch (token.tagID) {
    case TAG_ID.NOSCRIPT: {
      p.openElements.pop(), p.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    case TAG_ID.BR: {
      tokenInHeadNoScript(p, token);
      break;
    }
    default:
      p._err(token, ERR.endTagWithoutMatchingOpenElement);
  }
}
function tokenInHeadNoScript(p, token) {
  let errCode = token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
  p._err(token, errCode), p.openElements.pop(), p.insertionMode = InsertionMode.IN_HEAD, p._processToken(token);
}
function startTagAfterHead(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.BODY: {
      p._insertElement(token, NS.HTML), p.framesetOk = !1, p.insertionMode = InsertionMode.IN_BODY;
      break;
    }
    case TAG_ID.FRAMESET: {
      p._insertElement(token, NS.HTML), p.insertionMode = InsertionMode.IN_FRAMESET;
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.SCRIPT:
    case TAG_ID.STYLE:
    case TAG_ID.TEMPLATE:
    case TAG_ID.TITLE: {
      p._err(token, ERR.abandonedHeadElementChild), p.openElements.push(p.headElement, TAG_ID.HEAD), startTagInHead(p, token), p.openElements.remove(p.headElement);
      break;
    }
    case TAG_ID.HEAD: {
      p._err(token, ERR.misplacedStartTagForHeadElement);
      break;
    }
    default:
      tokenAfterHead(p, token);
  }
}
function endTagAfterHead(p, token) {
  switch (token.tagID) {
    case TAG_ID.BODY:
    case TAG_ID.HTML:
    case TAG_ID.BR: {
      tokenAfterHead(p, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    default:
      p._err(token, ERR.endTagWithoutMatchingOpenElement);
  }
}
function tokenAfterHead(p, token) {
  p._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY), p.insertionMode = InsertionMode.IN_BODY, modeInBody(p, token);
}
function modeInBody(p, token) {
  switch (token.type) {
    case TokenType.CHARACTER: {
      characterInBody(p, token);
      break;
    }
    case TokenType.WHITESPACE_CHARACTER: {
      whitespaceCharacterInBody(p, token);
      break;
    }
    case TokenType.COMMENT: {
      appendComment(p, token);
      break;
    }
    case TokenType.START_TAG: {
      startTagInBody(p, token);
      break;
    }
    case TokenType.END_TAG: {
      endTagInBody(p, token);
      break;
    }
    case TokenType.EOF: {
      eofInBody(p, token);
      break;
    }
    default:
  }
}
function whitespaceCharacterInBody(p, token) {
  p._reconstructActiveFormattingElements(), p._insertCharacters(token);
}
function characterInBody(p, token) {
  p._reconstructActiveFormattingElements(), p._insertCharacters(token), p.framesetOk = !1;
}
function htmlStartTagInBody(p, token) {
  p.openElements.tmplCount === 0 && p.treeAdapter.adoptAttributes(p.openElements.items[0], token.attrs);
}
function bodyStartTagInBody(p, token) {
  let bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
  bodyElement && p.openElements.tmplCount === 0 && (p.framesetOk = !1, p.treeAdapter.adoptAttributes(bodyElement, token.attrs));
}
function framesetStartTagInBody(p, token) {
  let bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
  p.framesetOk && bodyElement && (p.treeAdapter.detachNode(bodyElement), p.openElements.popAllUpToHtmlElement(), p._insertElement(token, NS.HTML), p.insertionMode = InsertionMode.IN_FRAMESET);
}
function addressStartTagInBody(p, token) {
  p.openElements.hasInButtonScope(TAG_ID.P) && p._closePElement(), p._insertElement(token, NS.HTML);
}
function numberedHeaderStartTagInBody(p, token) {
  p.openElements.hasInButtonScope(TAG_ID.P) && p._closePElement(), p.openElements.currentTagId !== void 0 && NUMBERED_HEADERS.has(p.openElements.currentTagId) && p.openElements.pop(), p._insertElement(token, NS.HTML);
}
function preStartTagInBody(p, token) {
  p.openElements.hasInButtonScope(TAG_ID.P) && p._closePElement(), p._insertElement(token, NS.HTML), p.skipNextNewLine = !0, p.framesetOk = !1;
}
function formStartTagInBody(p, token) {
  let inTemplate = p.openElements.tmplCount > 0;
  (!p.formElement || inTemplate) && (p.openElements.hasInButtonScope(TAG_ID.P) && p._closePElement(), p._insertElement(token, NS.HTML), inTemplate || (p.formElement = p.openElements.current));
}
function listItemStartTagInBody(p, token) {
  p.framesetOk = !1;
  let tn = token.tagID;
  for (let i = p.openElements.stackTop; i >= 0; i--) {
    let elementId = p.openElements.tagIDs[i];
    if (tn === TAG_ID.LI && elementId === TAG_ID.LI || (tn === TAG_ID.DD || tn === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
      p.openElements.generateImpliedEndTagsWithExclusion(elementId), p.openElements.popUntilTagNamePopped(elementId);
      break;
    }
    if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p._isSpecialElement(p.openElements.items[i], elementId))
      break;
  }
  p.openElements.hasInButtonScope(TAG_ID.P) && p._closePElement(), p._insertElement(token, NS.HTML);
}
function plaintextStartTagInBody(p, token) {
  p.openElements.hasInButtonScope(TAG_ID.P) && p._closePElement(), p._insertElement(token, NS.HTML), p.tokenizer.state = TokenizerMode.PLAINTEXT;
}
function buttonStartTagInBody(p, token) {
  p.openElements.hasInScope(TAG_ID.BUTTON) && (p.openElements.generateImpliedEndTags(), p.openElements.popUntilTagNamePopped(TAG_ID.BUTTON)), p._reconstructActiveFormattingElements(), p._insertElement(token, NS.HTML), p.framesetOk = !1;
}
function aStartTagInBody(p, token) {
  let activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
  activeElementEntry && (callAdoptionAgency(p, token), p.openElements.remove(activeElementEntry.element), p.activeFormattingElements.removeEntry(activeElementEntry)), p._reconstructActiveFormattingElements(), p._insertElement(token, NS.HTML), p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function bStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements(), p._insertElement(token, NS.HTML), p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function nobrStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements(), p.openElements.hasInScope(TAG_ID.NOBR) && (callAdoptionAgency(p, token), p._reconstructActiveFormattingElements()), p._insertElement(token, NS.HTML), p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function appletStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements(), p._insertElement(token, NS.HTML), p.activeFormattingElements.insertMarker(), p.framesetOk = !1;
}
function tableStartTagInBody(p, token) {
  p.treeAdapter.getDocumentMode(p.document) !== DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope(TAG_ID.P) && p._closePElement(), p._insertElement(token, NS.HTML), p.framesetOk = !1, p.insertionMode = InsertionMode.IN_TABLE;
}
function areaStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements(), p._appendElement(token, NS.HTML), p.framesetOk = !1, token.ackSelfClosing = !0;
}
function isHiddenInput(token) {
  let inputType = getTokenAttr(token, ATTRS.TYPE);
  return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
}
function inputStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements(), p._appendElement(token, NS.HTML), isHiddenInput(token) || (p.framesetOk = !1), token.ackSelfClosing = !0;
}
function paramStartTagInBody(p, token) {
  p._appendElement(token, NS.HTML), token.ackSelfClosing = !0;
}
function hrStartTagInBody(p, token) {
  p.openElements.hasInButtonScope(TAG_ID.P) && p._closePElement(), p._appendElement(token, NS.HTML), p.framesetOk = !1, token.ackSelfClosing = !0;
}
function imageStartTagInBody(p, token) {
  token.tagName = TAG_NAMES.IMG, token.tagID = TAG_ID.IMG, areaStartTagInBody(p, token);
}
function textareaStartTagInBody(p, token) {
  p._insertElement(token, NS.HTML), p.skipNextNewLine = !0, p.tokenizer.state = TokenizerMode.RCDATA, p.originalInsertionMode = p.insertionMode, p.framesetOk = !1, p.insertionMode = InsertionMode.TEXT;
}
function xmpStartTagInBody(p, token) {
  p.openElements.hasInButtonScope(TAG_ID.P) && p._closePElement(), p._reconstructActiveFormattingElements(), p.framesetOk = !1, p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function iframeStartTagInBody(p, token) {
  p.framesetOk = !1, p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function rawTextStartTagInBody(p, token) {
  p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function selectStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements(), p._insertElement(token, NS.HTML), p.framesetOk = !1, p.insertionMode = p.insertionMode === InsertionMode.IN_TABLE || p.insertionMode === InsertionMode.IN_CAPTION || p.insertionMode === InsertionMode.IN_TABLE_BODY || p.insertionMode === InsertionMode.IN_ROW || p.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
}
function optgroupStartTagInBody(p, token) {
  p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.pop(), p._reconstructActiveFormattingElements(), p._insertElement(token, NS.HTML);
}
function rbStartTagInBody(p, token) {
  p.openElements.hasInScope(TAG_ID.RUBY) && p.openElements.generateImpliedEndTags(), p._insertElement(token, NS.HTML);
}
function rtStartTagInBody(p, token) {
  p.openElements.hasInScope(TAG_ID.RUBY) && p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC), p._insertElement(token, NS.HTML);
}
function mathStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements(), adjustTokenMathMLAttrs(token), adjustTokenXMLAttrs(token), token.selfClosing ? p._appendElement(token, NS.MATHML) : p._insertElement(token, NS.MATHML), token.ackSelfClosing = !0;
}
function svgStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements(), adjustTokenSVGAttrs(token), adjustTokenXMLAttrs(token), token.selfClosing ? p._appendElement(token, NS.SVG) : p._insertElement(token, NS.SVG), token.ackSelfClosing = !0;
}
function genericStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements(), p._insertElement(token, NS.HTML);
}
function startTagInBody(p, token) {
  switch (token.tagID) {
    case TAG_ID.I:
    case TAG_ID.S:
    case TAG_ID.B:
    case TAG_ID.U:
    case TAG_ID.EM:
    case TAG_ID.TT:
    case TAG_ID.BIG:
    case TAG_ID.CODE:
    case TAG_ID.FONT:
    case TAG_ID.SMALL:
    case TAG_ID.STRIKE:
    case TAG_ID.STRONG: {
      bStartTagInBody(p, token);
      break;
    }
    case TAG_ID.A: {
      aStartTagInBody(p, token);
      break;
    }
    case TAG_ID.H1:
    case TAG_ID.H2:
    case TAG_ID.H3:
    case TAG_ID.H4:
    case TAG_ID.H5:
    case TAG_ID.H6: {
      numberedHeaderStartTagInBody(p, token);
      break;
    }
    case TAG_ID.P:
    case TAG_ID.DL:
    case TAG_ID.OL:
    case TAG_ID.UL:
    case TAG_ID.DIV:
    case TAG_ID.DIR:
    case TAG_ID.NAV:
    case TAG_ID.MAIN:
    case TAG_ID.MENU:
    case TAG_ID.ASIDE:
    case TAG_ID.CENTER:
    case TAG_ID.FIGURE:
    case TAG_ID.FOOTER:
    case TAG_ID.HEADER:
    case TAG_ID.HGROUP:
    case TAG_ID.DIALOG:
    case TAG_ID.DETAILS:
    case TAG_ID.ADDRESS:
    case TAG_ID.ARTICLE:
    case TAG_ID.SEARCH:
    case TAG_ID.SECTION:
    case TAG_ID.SUMMARY:
    case TAG_ID.FIELDSET:
    case TAG_ID.BLOCKQUOTE:
    case TAG_ID.FIGCAPTION: {
      addressStartTagInBody(p, token);
      break;
    }
    case TAG_ID.LI:
    case TAG_ID.DD:
    case TAG_ID.DT: {
      listItemStartTagInBody(p, token);
      break;
    }
    case TAG_ID.BR:
    case TAG_ID.IMG:
    case TAG_ID.WBR:
    case TAG_ID.AREA:
    case TAG_ID.EMBED:
    case TAG_ID.KEYGEN: {
      areaStartTagInBody(p, token);
      break;
    }
    case TAG_ID.HR: {
      hrStartTagInBody(p, token);
      break;
    }
    case TAG_ID.RB:
    case TAG_ID.RTC: {
      rbStartTagInBody(p, token);
      break;
    }
    case TAG_ID.RT:
    case TAG_ID.RP: {
      rtStartTagInBody(p, token);
      break;
    }
    case TAG_ID.PRE:
    case TAG_ID.LISTING: {
      preStartTagInBody(p, token);
      break;
    }
    case TAG_ID.XMP: {
      xmpStartTagInBody(p, token);
      break;
    }
    case TAG_ID.SVG: {
      svgStartTagInBody(p, token);
      break;
    }
    case TAG_ID.HTML: {
      htmlStartTagInBody(p, token);
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.STYLE:
    case TAG_ID.TITLE:
    case TAG_ID.SCRIPT:
    case TAG_ID.BGSOUND:
    case TAG_ID.BASEFONT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
    case TAG_ID.BODY: {
      bodyStartTagInBody(p, token);
      break;
    }
    case TAG_ID.FORM: {
      formStartTagInBody(p, token);
      break;
    }
    case TAG_ID.NOBR: {
      nobrStartTagInBody(p, token);
      break;
    }
    case TAG_ID.MATH: {
      mathStartTagInBody(p, token);
      break;
    }
    case TAG_ID.TABLE: {
      tableStartTagInBody(p, token);
      break;
    }
    case TAG_ID.INPUT: {
      inputStartTagInBody(p, token);
      break;
    }
    case TAG_ID.PARAM:
    case TAG_ID.TRACK:
    case TAG_ID.SOURCE: {
      paramStartTagInBody(p, token);
      break;
    }
    case TAG_ID.IMAGE: {
      imageStartTagInBody(p, token);
      break;
    }
    case TAG_ID.BUTTON: {
      buttonStartTagInBody(p, token);
      break;
    }
    case TAG_ID.APPLET:
    case TAG_ID.OBJECT:
    case TAG_ID.MARQUEE: {
      appletStartTagInBody(p, token);
      break;
    }
    case TAG_ID.IFRAME: {
      iframeStartTagInBody(p, token);
      break;
    }
    case TAG_ID.SELECT: {
      selectStartTagInBody(p, token);
      break;
    }
    case TAG_ID.OPTION:
    case TAG_ID.OPTGROUP: {
      optgroupStartTagInBody(p, token);
      break;
    }
    case TAG_ID.NOEMBED:
    case TAG_ID.NOFRAMES: {
      rawTextStartTagInBody(p, token);
      break;
    }
    case TAG_ID.FRAMESET: {
      framesetStartTagInBody(p, token);
      break;
    }
    case TAG_ID.TEXTAREA: {
      textareaStartTagInBody(p, token);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      p.options.scriptingEnabled ? rawTextStartTagInBody(p, token) : genericStartTagInBody(p, token);
      break;
    }
    case TAG_ID.PLAINTEXT: {
      plaintextStartTagInBody(p, token);
      break;
    }
    case TAG_ID.COL:
    case TAG_ID.TH:
    case TAG_ID.TD:
    case TAG_ID.TR:
    case TAG_ID.HEAD:
    case TAG_ID.FRAME:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.CAPTION:
    case TAG_ID.COLGROUP:
      break;
    default:
      genericStartTagInBody(p, token);
  }
}
function bodyEndTagInBody(p, token) {
  if (p.openElements.hasInScope(TAG_ID.BODY) && (p.insertionMode = InsertionMode.AFTER_BODY, p.options.sourceCodeLocationInfo)) {
    let bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
    bodyElement && p._setEndLocation(bodyElement, token);
  }
}
function htmlEndTagInBody(p, token) {
  p.openElements.hasInScope(TAG_ID.BODY) && (p.insertionMode = InsertionMode.AFTER_BODY, endTagAfterBody(p, token));
}
function addressEndTagInBody(p, token) {
  let tn = token.tagID;
  p.openElements.hasInScope(tn) && (p.openElements.generateImpliedEndTags(), p.openElements.popUntilTagNamePopped(tn));
}
function formEndTagInBody(p) {
  let inTemplate = p.openElements.tmplCount > 0, { formElement } = p;
  inTemplate || (p.formElement = null), (formElement || inTemplate) && p.openElements.hasInScope(TAG_ID.FORM) && (p.openElements.generateImpliedEndTags(), inTemplate ? p.openElements.popUntilTagNamePopped(TAG_ID.FORM) : formElement && p.openElements.remove(formElement));
}
function pEndTagInBody(p) {
  p.openElements.hasInButtonScope(TAG_ID.P) || p._insertFakeElement(TAG_NAMES.P, TAG_ID.P), p._closePElement();
}
function liEndTagInBody(p) {
  p.openElements.hasInListItemScope(TAG_ID.LI) && (p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI), p.openElements.popUntilTagNamePopped(TAG_ID.LI));
}
function ddEndTagInBody(p, token) {
  let tn = token.tagID;
  p.openElements.hasInScope(tn) && (p.openElements.generateImpliedEndTagsWithExclusion(tn), p.openElements.popUntilTagNamePopped(tn));
}
function numberedHeaderEndTagInBody(p) {
  p.openElements.hasNumberedHeaderInScope() && (p.openElements.generateImpliedEndTags(), p.openElements.popUntilNumberedHeaderPopped());
}
function appletEndTagInBody(p, token) {
  let tn = token.tagID;
  p.openElements.hasInScope(tn) && (p.openElements.generateImpliedEndTags(), p.openElements.popUntilTagNamePopped(tn), p.activeFormattingElements.clearToLastMarker());
}
function brEndTagInBody(p) {
  p._reconstructActiveFormattingElements(), p._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR), p.openElements.pop(), p.framesetOk = !1;
}
function genericEndTagInBody(p, token) {
  let tn = token.tagName, tid = token.tagID;
  for (let i = p.openElements.stackTop; i > 0; i--) {
    let element = p.openElements.items[i], elementId = p.openElements.tagIDs[i];
    if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
      p.openElements.generateImpliedEndTagsWithExclusion(tid), p.openElements.stackTop >= i && p.openElements.shortenToLength(i);
      break;
    }
    if (p._isSpecialElement(element, elementId))
      break;
  }
}
function endTagInBody(p, token) {
  switch (token.tagID) {
    case TAG_ID.A:
    case TAG_ID.B:
    case TAG_ID.I:
    case TAG_ID.S:
    case TAG_ID.U:
    case TAG_ID.EM:
    case TAG_ID.TT:
    case TAG_ID.BIG:
    case TAG_ID.CODE:
    case TAG_ID.FONT:
    case TAG_ID.NOBR:
    case TAG_ID.SMALL:
    case TAG_ID.STRIKE:
    case TAG_ID.STRONG: {
      callAdoptionAgency(p, token);
      break;
    }
    case TAG_ID.P: {
      pEndTagInBody(p);
      break;
    }
    case TAG_ID.DL:
    case TAG_ID.UL:
    case TAG_ID.OL:
    case TAG_ID.DIR:
    case TAG_ID.DIV:
    case TAG_ID.NAV:
    case TAG_ID.PRE:
    case TAG_ID.MAIN:
    case TAG_ID.MENU:
    case TAG_ID.ASIDE:
    case TAG_ID.BUTTON:
    case TAG_ID.CENTER:
    case TAG_ID.FIGURE:
    case TAG_ID.FOOTER:
    case TAG_ID.HEADER:
    case TAG_ID.HGROUP:
    case TAG_ID.DIALOG:
    case TAG_ID.ADDRESS:
    case TAG_ID.ARTICLE:
    case TAG_ID.DETAILS:
    case TAG_ID.SEARCH:
    case TAG_ID.SECTION:
    case TAG_ID.SUMMARY:
    case TAG_ID.LISTING:
    case TAG_ID.FIELDSET:
    case TAG_ID.BLOCKQUOTE:
    case TAG_ID.FIGCAPTION: {
      addressEndTagInBody(p, token);
      break;
    }
    case TAG_ID.LI: {
      liEndTagInBody(p);
      break;
    }
    case TAG_ID.DD:
    case TAG_ID.DT: {
      ddEndTagInBody(p, token);
      break;
    }
    case TAG_ID.H1:
    case TAG_ID.H2:
    case TAG_ID.H3:
    case TAG_ID.H4:
    case TAG_ID.H5:
    case TAG_ID.H6: {
      numberedHeaderEndTagInBody(p);
      break;
    }
    case TAG_ID.BR: {
      brEndTagInBody(p);
      break;
    }
    case TAG_ID.BODY: {
      bodyEndTagInBody(p, token);
      break;
    }
    case TAG_ID.HTML: {
      htmlEndTagInBody(p, token);
      break;
    }
    case TAG_ID.FORM: {
      formEndTagInBody(p);
      break;
    }
    case TAG_ID.APPLET:
    case TAG_ID.OBJECT:
    case TAG_ID.MARQUEE: {
      appletEndTagInBody(p, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    default:
      genericEndTagInBody(p, token);
  }
}
function eofInBody(p, token) {
  p.tmplInsertionModeStack.length > 0 ? eofInTemplate(p, token) : stopParsing(p, token);
}
function endTagInText(p, token) {
  var _a2;
  token.tagID === TAG_ID.SCRIPT && ((_a2 = p.scriptHandler) === null || _a2 === void 0 || _a2.call(p, p.openElements.current)), p.openElements.pop(), p.insertionMode = p.originalInsertionMode;
}
function eofInText(p, token) {
  p._err(token, ERR.eofInElementThatCanContainOnlyText), p.openElements.pop(), p.insertionMode = p.originalInsertionMode, p.onEof(token);
}
function characterInTable(p, token) {
  if (p.openElements.currentTagId !== void 0 && TABLE_STRUCTURE_TAGS.has(p.openElements.currentTagId))
    switch (p.pendingCharacterTokens.length = 0, p.hasNonWhitespacePendingCharacterToken = !1, p.originalInsertionMode = p.insertionMode, p.insertionMode = InsertionMode.IN_TABLE_TEXT, token.type) {
      case TokenType.CHARACTER: {
        characterInTableText(p, token);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        whitespaceCharacterInTableText(p, token);
        break;
      }
    }
  else
    tokenInTable(p, token);
}
function captionStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext(), p.activeFormattingElements.insertMarker(), p._insertElement(token, NS.HTML), p.insertionMode = InsertionMode.IN_CAPTION;
}
function colgroupStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext(), p._insertElement(token, NS.HTML), p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
}
function colStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext(), p._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP), p.insertionMode = InsertionMode.IN_COLUMN_GROUP, startTagInColumnGroup(p, token);
}
function tbodyStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext(), p._insertElement(token, NS.HTML), p.insertionMode = InsertionMode.IN_TABLE_BODY;
}
function tdStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext(), p._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY), p.insertionMode = InsertionMode.IN_TABLE_BODY, startTagInTableBody(p, token);
}
function tableStartTagInTable(p, token) {
  p.openElements.hasInTableScope(TAG_ID.TABLE) && (p.openElements.popUntilTagNamePopped(TAG_ID.TABLE), p._resetInsertionMode(), p._processStartTag(token));
}
function inputStartTagInTable(p, token) {
  isHiddenInput(token) ? p._appendElement(token, NS.HTML) : tokenInTable(p, token), token.ackSelfClosing = !0;
}
function formStartTagInTable(p, token) {
  !p.formElement && p.openElements.tmplCount === 0 && (p._insertElement(token, NS.HTML), p.formElement = p.openElements.current, p.openElements.pop());
}
function startTagInTable(p, token) {
  switch (token.tagID) {
    case TAG_ID.TD:
    case TAG_ID.TH:
    case TAG_ID.TR: {
      tdStartTagInTable(p, token);
      break;
    }
    case TAG_ID.STYLE:
    case TAG_ID.SCRIPT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
    case TAG_ID.COL: {
      colStartTagInTable(p, token);
      break;
    }
    case TAG_ID.FORM: {
      formStartTagInTable(p, token);
      break;
    }
    case TAG_ID.TABLE: {
      tableStartTagInTable(p, token);
      break;
    }
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      tbodyStartTagInTable(p, token);
      break;
    }
    case TAG_ID.INPUT: {
      inputStartTagInTable(p, token);
      break;
    }
    case TAG_ID.CAPTION: {
      captionStartTagInTable(p, token);
      break;
    }
    case TAG_ID.COLGROUP: {
      colgroupStartTagInTable(p, token);
      break;
    }
    default:
      tokenInTable(p, token);
  }
}
function endTagInTable(p, token) {
  switch (token.tagID) {
    case TAG_ID.TABLE: {
      p.openElements.hasInTableScope(TAG_ID.TABLE) && (p.openElements.popUntilTagNamePopped(TAG_ID.TABLE), p._resetInsertionMode());
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TBODY:
    case TAG_ID.TD:
    case TAG_ID.TFOOT:
    case TAG_ID.TH:
    case TAG_ID.THEAD:
    case TAG_ID.TR:
      break;
    default:
      tokenInTable(p, token);
  }
}
function tokenInTable(p, token) {
  let savedFosterParentingState = p.fosterParentingEnabled;
  p.fosterParentingEnabled = !0, modeInBody(p, token), p.fosterParentingEnabled = savedFosterParentingState;
}
function whitespaceCharacterInTableText(p, token) {
  p.pendingCharacterTokens.push(token);
}
function characterInTableText(p, token) {
  p.pendingCharacterTokens.push(token), p.hasNonWhitespacePendingCharacterToken = !0;
}
function tokenInTableText(p, token) {
  let i = 0;
  if (p.hasNonWhitespacePendingCharacterToken)
    for (; i < p.pendingCharacterTokens.length; i++)
      tokenInTable(p, p.pendingCharacterTokens[i]);
  else
    for (; i < p.pendingCharacterTokens.length; i++)
      p._insertCharacters(p.pendingCharacterTokens[i]);
  p.insertionMode = p.originalInsertionMode, p._processToken(token);
}
var TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([TAG_ID.CAPTION, TAG_ID.COL, TAG_ID.COLGROUP, TAG_ID.TBODY, TAG_ID.TD, TAG_ID.TFOOT, TAG_ID.TH, TAG_ID.THEAD, TAG_ID.TR]);
function startTagInCaption(p, token) {
  let tn = token.tagID;
  TABLE_VOID_ELEMENTS.has(tn) ? p.openElements.hasInTableScope(TAG_ID.CAPTION) && (p.openElements.generateImpliedEndTags(), p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION), p.activeFormattingElements.clearToLastMarker(), p.insertionMode = InsertionMode.IN_TABLE, startTagInTable(p, token)) : startTagInBody(p, token);
}
function endTagInCaption(p, token) {
  let tn = token.tagID;
  switch (tn) {
    case TAG_ID.CAPTION:
    case TAG_ID.TABLE: {
      p.openElements.hasInTableScope(TAG_ID.CAPTION) && (p.openElements.generateImpliedEndTags(), p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION), p.activeFormattingElements.clearToLastMarker(), p.insertionMode = InsertionMode.IN_TABLE, tn === TAG_ID.TABLE && endTagInTable(p, token));
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TBODY:
    case TAG_ID.TD:
    case TAG_ID.TFOOT:
    case TAG_ID.TH:
    case TAG_ID.THEAD:
    case TAG_ID.TR:
      break;
    default:
      endTagInBody(p, token);
  }
}
function startTagInColumnGroup(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.COL: {
      p._appendElement(token, NS.HTML), token.ackSelfClosing = !0;
      break;
    }
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
    default:
      tokenInColumnGroup(p, token);
  }
}
function endTagInColumnGroup(p, token) {
  switch (token.tagID) {
    case TAG_ID.COLGROUP: {
      p.openElements.currentTagId === TAG_ID.COLGROUP && (p.openElements.pop(), p.insertionMode = InsertionMode.IN_TABLE);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    case TAG_ID.COL:
      break;
    default:
      tokenInColumnGroup(p, token);
  }
}
function tokenInColumnGroup(p, token) {
  p.openElements.currentTagId === TAG_ID.COLGROUP && (p.openElements.pop(), p.insertionMode = InsertionMode.IN_TABLE, p._processToken(token));
}
function startTagInTableBody(p, token) {
  switch (token.tagID) {
    case TAG_ID.TR: {
      p.openElements.clearBackToTableBodyContext(), p._insertElement(token, NS.HTML), p.insertionMode = InsertionMode.IN_ROW;
      break;
    }
    case TAG_ID.TH:
    case TAG_ID.TD: {
      p.openElements.clearBackToTableBodyContext(), p._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR), p.insertionMode = InsertionMode.IN_ROW, startTagInRow(p, token);
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      p.openElements.hasTableBodyContextInTableScope() && (p.openElements.clearBackToTableBodyContext(), p.openElements.pop(), p.insertionMode = InsertionMode.IN_TABLE, startTagInTable(p, token));
      break;
    }
    default:
      startTagInTable(p, token);
  }
}
function endTagInTableBody(p, token) {
  let tn = token.tagID;
  switch (token.tagID) {
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      p.openElements.hasInTableScope(tn) && (p.openElements.clearBackToTableBodyContext(), p.openElements.pop(), p.insertionMode = InsertionMode.IN_TABLE);
      break;
    }
    case TAG_ID.TABLE: {
      p.openElements.hasTableBodyContextInTableScope() && (p.openElements.clearBackToTableBodyContext(), p.openElements.pop(), p.insertionMode = InsertionMode.IN_TABLE, endTagInTable(p, token));
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TD:
    case TAG_ID.TH:
    case TAG_ID.TR:
      break;
    default:
      endTagInTable(p, token);
  }
}
function startTagInRow(p, token) {
  switch (token.tagID) {
    case TAG_ID.TH:
    case TAG_ID.TD: {
      p.openElements.clearBackToTableRowContext(), p._insertElement(token, NS.HTML), p.insertionMode = InsertionMode.IN_CELL, p.activeFormattingElements.insertMarker();
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      p.openElements.hasInTableScope(TAG_ID.TR) && (p.openElements.clearBackToTableRowContext(), p.openElements.pop(), p.insertionMode = InsertionMode.IN_TABLE_BODY, startTagInTableBody(p, token));
      break;
    }
    default:
      startTagInTable(p, token);
  }
}
function endTagInRow(p, token) {
  switch (token.tagID) {
    case TAG_ID.TR: {
      p.openElements.hasInTableScope(TAG_ID.TR) && (p.openElements.clearBackToTableRowContext(), p.openElements.pop(), p.insertionMode = InsertionMode.IN_TABLE_BODY);
      break;
    }
    case TAG_ID.TABLE: {
      p.openElements.hasInTableScope(TAG_ID.TR) && (p.openElements.clearBackToTableRowContext(), p.openElements.pop(), p.insertionMode = InsertionMode.IN_TABLE_BODY, endTagInTableBody(p, token));
      break;
    }
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      (p.openElements.hasInTableScope(token.tagID) || p.openElements.hasInTableScope(TAG_ID.TR)) && (p.openElements.clearBackToTableRowContext(), p.openElements.pop(), p.insertionMode = InsertionMode.IN_TABLE_BODY, endTagInTableBody(p, token));
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TD:
    case TAG_ID.TH:
      break;
    default:
      endTagInTable(p, token);
  }
}
function startTagInCell(p, token) {
  let tn = token.tagID;
  TABLE_VOID_ELEMENTS.has(tn) ? (p.openElements.hasInTableScope(TAG_ID.TD) || p.openElements.hasInTableScope(TAG_ID.TH)) && (p._closeTableCell(), startTagInRow(p, token)) : startTagInBody(p, token);
}
function endTagInCell(p, token) {
  let tn = token.tagID;
  switch (tn) {
    case TAG_ID.TD:
    case TAG_ID.TH: {
      p.openElements.hasInTableScope(tn) && (p.openElements.generateImpliedEndTags(), p.openElements.popUntilTagNamePopped(tn), p.activeFormattingElements.clearToLastMarker(), p.insertionMode = InsertionMode.IN_ROW);
      break;
    }
    case TAG_ID.TABLE:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      p.openElements.hasInTableScope(tn) && (p._closeTableCell(), endTagInRow(p, token));
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
      break;
    default:
      endTagInBody(p, token);
  }
}
function startTagInSelect(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.OPTION: {
      p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.pop(), p._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.OPTGROUP: {
      p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.pop(), p.openElements.currentTagId === TAG_ID.OPTGROUP && p.openElements.pop(), p._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.HR: {
      p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.pop(), p.openElements.currentTagId === TAG_ID.OPTGROUP && p.openElements.pop(), p._appendElement(token, NS.HTML), token.ackSelfClosing = !0;
      break;
    }
    case TAG_ID.INPUT:
    case TAG_ID.KEYGEN:
    case TAG_ID.TEXTAREA:
    case TAG_ID.SELECT: {
      p.openElements.hasInSelectScope(TAG_ID.SELECT) && (p.openElements.popUntilTagNamePopped(TAG_ID.SELECT), p._resetInsertionMode(), token.tagID !== TAG_ID.SELECT && p._processStartTag(token));
      break;
    }
    case TAG_ID.SCRIPT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
    default:
  }
}
function endTagInSelect(p, token) {
  switch (token.tagID) {
    case TAG_ID.OPTGROUP: {
      p.openElements.stackTop > 0 && p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.tagIDs[p.openElements.stackTop - 1] === TAG_ID.OPTGROUP && p.openElements.pop(), p.openElements.currentTagId === TAG_ID.OPTGROUP && p.openElements.pop();
      break;
    }
    case TAG_ID.OPTION: {
      p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.pop();
      break;
    }
    case TAG_ID.SELECT: {
      p.openElements.hasInSelectScope(TAG_ID.SELECT) && (p.openElements.popUntilTagNamePopped(TAG_ID.SELECT), p._resetInsertionMode());
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    default:
  }
}
function startTagInSelectInTable(p, token) {
  let tn = token.tagID;
  tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH ? (p.openElements.popUntilTagNamePopped(TAG_ID.SELECT), p._resetInsertionMode(), p._processStartTag(token)) : startTagInSelect(p, token);
}
function endTagInSelectInTable(p, token) {
  let tn = token.tagID;
  tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH ? p.openElements.hasInTableScope(tn) && (p.openElements.popUntilTagNamePopped(TAG_ID.SELECT), p._resetInsertionMode(), p.onEndTag(token)) : endTagInSelect(p, token);
}
function startTagInTemplate(p, token) {
  switch (token.tagID) {
    // First, handle tags that can start without a mode change
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.SCRIPT:
    case TAG_ID.STYLE:
    case TAG_ID.TEMPLATE:
    case TAG_ID.TITLE: {
      startTagInHead(p, token);
      break;
    }
    // Re-process the token in the appropriate mode
    case TAG_ID.CAPTION:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE, p.insertionMode = InsertionMode.IN_TABLE, startTagInTable(p, token);
      break;
    }
    case TAG_ID.COL: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP, p.insertionMode = InsertionMode.IN_COLUMN_GROUP, startTagInColumnGroup(p, token);
      break;
    }
    case TAG_ID.TR: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY, p.insertionMode = InsertionMode.IN_TABLE_BODY, startTagInTableBody(p, token);
      break;
    }
    case TAG_ID.TD:
    case TAG_ID.TH: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_ROW, p.insertionMode = InsertionMode.IN_ROW, startTagInRow(p, token);
      break;
    }
    default:
      p.tmplInsertionModeStack[0] = InsertionMode.IN_BODY, p.insertionMode = InsertionMode.IN_BODY, startTagInBody(p, token);
  }
}
function endTagInTemplate(p, token) {
  token.tagID === TAG_ID.TEMPLATE && templateEndTagInHead(p, token);
}
function eofInTemplate(p, token) {
  p.openElements.tmplCount > 0 ? (p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE), p.activeFormattingElements.clearToLastMarker(), p.tmplInsertionModeStack.shift(), p._resetInsertionMode(), p.onEof(token)) : stopParsing(p, token);
}
function startTagAfterBody(p, token) {
  token.tagID === TAG_ID.HTML ? startTagInBody(p, token) : tokenAfterBody(p, token);
}
function endTagAfterBody(p, token) {
  var _a2;
  if (token.tagID === TAG_ID.HTML) {
    if (p.fragmentContext || (p.insertionMode = InsertionMode.AFTER_AFTER_BODY), p.options.sourceCodeLocationInfo && p.openElements.tagIDs[0] === TAG_ID.HTML) {
      p._setEndLocation(p.openElements.items[0], token);
      let bodyElement = p.openElements.items[1];
      bodyElement && !(!((_a2 = p.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a2 === void 0) && _a2.endTag) && p._setEndLocation(bodyElement, token);
    }
  } else
    tokenAfterBody(p, token);
}
function tokenAfterBody(p, token) {
  p.insertionMode = InsertionMode.IN_BODY, modeInBody(p, token);
}
function startTagInFrameset(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.FRAMESET: {
      p._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.FRAME: {
      p._appendElement(token, NS.HTML), token.ackSelfClosing = !0;
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p, token);
      break;
    }
    default:
  }
}
function endTagInFrameset(p, token) {
  token.tagID === TAG_ID.FRAMESET && !p.openElements.isRootHtmlElementCurrent() && (p.openElements.pop(), !p.fragmentContext && p.openElements.currentTagId !== TAG_ID.FRAMESET && (p.insertionMode = InsertionMode.AFTER_FRAMESET));
}
function startTagAfterFrameset(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p, token);
      break;
    }
    default:
  }
}
function endTagAfterFrameset(p, token) {
  token.tagID === TAG_ID.HTML && (p.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET);
}
function startTagAfterAfterBody(p, token) {
  token.tagID === TAG_ID.HTML ? startTagInBody(p, token) : tokenAfterAfterBody(p, token);
}
function tokenAfterAfterBody(p, token) {
  p.insertionMode = InsertionMode.IN_BODY, modeInBody(p, token);
}
function startTagAfterAfterFrameset(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p, token);
      break;
    }
    default:
  }
}
function nullCharacterInForeignContent(p, token) {
  token.chars = REPLACEMENT_CHARACTER, p._insertCharacters(token);
}
function characterInForeignContent(p, token) {
  p._insertCharacters(token), p.framesetOk = !1;
}
function popUntilHtmlOrIntegrationPoint(p) {
  for (; p.treeAdapter.getNamespaceURI(p.openElements.current) !== NS.HTML && p.openElements.currentTagId !== void 0 && !p._isIntegrationPoint(p.openElements.currentTagId, p.openElements.current); )
    p.openElements.pop();
}
function startTagInForeignContent(p, token) {
  if (causesExit(token))
    popUntilHtmlOrIntegrationPoint(p), p._startTagOutsideForeignContent(token);
  else {
    let current = p._getAdjustedCurrentElement(), currentNs = p.treeAdapter.getNamespaceURI(current);
    currentNs === NS.MATHML ? adjustTokenMathMLAttrs(token) : currentNs === NS.SVG && (adjustTokenSVGTagName(token), adjustTokenSVGAttrs(token)), adjustTokenXMLAttrs(token), token.selfClosing ? p._appendElement(token, currentNs) : p._insertElement(token, currentNs), token.ackSelfClosing = !0;
  }
}
function endTagInForeignContent(p, token) {
  if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
    popUntilHtmlOrIntegrationPoint(p), p._endTagOutsideForeignContent(token);
    return;
  }
  for (let i = p.openElements.stackTop; i > 0; i--) {
    let element = p.openElements.items[i];
    if (p.treeAdapter.getNamespaceURI(element) === NS.HTML) {
      p._endTagOutsideForeignContent(token);
      break;
    }
    let tagName = p.treeAdapter.getTagName(element);
    if (tagName.toLowerCase() === token.tagName) {
      token.tagName = tagName, p.openElements.shortenToLength(i);
      break;
    }
  }
}

// node_modules/entities/dist/esm/escape.js
var getCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt == null ? (c, index) => (c.charCodeAt(index) & 64512) === 55296 ? (c.charCodeAt(index) - 55296) * 1024 + c.charCodeAt(index + 1) - 56320 + 65536 : c.charCodeAt(index) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (input, index) => input.codePointAt(index)
  )
);

// node_modules/parse5/dist/serializer/index.js
var VOID_ELEMENTS = /* @__PURE__ */ new Set([
  TAG_NAMES.AREA,
  TAG_NAMES.BASE,
  TAG_NAMES.BASEFONT,
  TAG_NAMES.BGSOUND,
  TAG_NAMES.BR,
  TAG_NAMES.COL,
  TAG_NAMES.EMBED,
  TAG_NAMES.FRAME,
  TAG_NAMES.HR,
  TAG_NAMES.IMG,
  TAG_NAMES.INPUT,
  TAG_NAMES.KEYGEN,
  TAG_NAMES.LINK,
  TAG_NAMES.META,
  TAG_NAMES.PARAM,
  TAG_NAMES.SOURCE,
  TAG_NAMES.TRACK,
  TAG_NAMES.WBR
]);

// node_modules/parse5/dist/index.js
function parse(html, options2) {
  return Parser.parse(html, options2);
}

// shared/frame-hosts.json
var frame_hosts_default = {
  scripts: ["cdn.jsdelivr.net", "cdnjs.cloudflare.com", "unpkg.com"],
  fonts: ["fonts.googleapis.com", "fonts.gstatic.com"],
  analytics: ["googletagmanager.com", "google-analytics.com", "analytics.google.com", "doubleclick.net", "plausible.io", "segment.com", "segment.io", "hotjar.com", "clarity.ms", "connect.facebook.net", "snap.licdn.com", "posthog.com", "mixpanel.com", "matomo.cloud", "cloudflareinsights.com"]
};

// shared/video-timeline.mjs
var TIMELINE_FORMAT = "brixon-feedback-timeline/1", TIMELINE_LIMITS = { bytes: 1e6, segments: 500, entries: 2e3, words: 2e4 }, SHA = /^[a-f0-9]{64}$/, ID = /^[A-Za-z0-9._-]{1,100}$/, SEGMENT_KINDS = /* @__PURE__ */ new Set(["hook", "body", "cta", "scene"]);
function parseFps(text2) {
  let match = typeof text2 == "string" && text2.match(/^(\d{1,6})(?:\/(\d{1,6}))?$/);
  if (!match) return null;
  let num = Number(match[1]), den = Number(match[2] ?? 1);
  return !num || !den || num / den > 240 ? null : { num, den, value: num / den };
}
var finite = (value) => typeof value == "number" && Number.isFinite(value), text = (value, max) => typeof value == "string" && value.length <= max && !/[\u0000-\u001f\u007f]/.test(value), optionalText = (value, max) => value === void 0 || text(value, max), rect = (value) => Array.isArray(value) && value.length === 4 && value.every((n) => finite(n) && n >= 0 && n <= 1) && value[0] < value[2] && value[1] < value[3];
function validateTimeline(value, expected = {}) {
  let problems = [], fail = (message) => (problems.push(message), problems);
  if (!value || typeof value != "object" || Array.isArray(value)) return fail("Timeline must be a JSON object.");
  if (value.format !== TIMELINE_FORMAT) return fail(`format must be "${TIMELINE_FORMAT}".`);
  let allowed = /* @__PURE__ */ new Set(["format", "variant", "source", "fps", "durationSeconds", "segments", "graphics", "sounds", "words"]);
  for (let key of Object.keys(value)) allowed.has(key) || problems.push(`Unknown field: ${key}.`);
  let fps = parseFps(value.fps);
  if (!fps) return fail('fps must be a positive fraction such as "30/1".');
  if (!finite(value.durationSeconds) || value.durationSeconds <= 0) return fail("durationSeconds must be a positive number.");
  let tolerance = 1 / fps.value + 1e-6, duration = value.durationSeconds;
  expected.fps && parseFps(expected.fps)?.value !== fps.value && problems.push(`fps ${value.fps} does not match the video (${expected.fps}).`), finite(expected.durationSeconds) && Math.abs(expected.durationSeconds - duration) > tolerance && problems.push(`durationSeconds ${duration} does not match the video (${expected.durationSeconds}).`), value.variant !== void 0 && (typeof value.variant != "object" || !value.variant || !optionalText(value.variant.id, 100) || !optionalText(value.variant.name, 200) || !optionalText(value.variant.studioVariantId, 100)) && problems.push("variant must contain short texts id, name and studioVariantId.");
  let source = value.source;
  if (source !== void 0)
    if (typeof source != "object" || !source) problems.push("source must be an object.");
    else {
      for (let key of ["masterSha256", "reviewSha256", "scriptSha256"]) source[key] !== void 0 && !SHA.test(source[key]) && problems.push(`source.${key} must be a SHA-256 hex digest.`);
      source.exact !== void 0 && typeof source.exact != "boolean" && problems.push("source.exact must be true or false.");
      for (let key of ["script", "run"]) optionalText(source[key], 500) || problems.push(`source.${key} must be a short text.`);
    }
  expected.reviewSha256 && source?.reviewSha256 !== expected.reviewSha256 && problems.push("source.reviewSha256 does not match the uploaded video.");
  let span = (entry, label) => !finite(entry.start) || !finite(entry.end) || entry.start < 0 || entry.start >= entry.end || entry.end > duration + tolerance ? (problems.push(`${label}: start and end must satisfy 0 <= start < end <= durationSeconds.`), !1) : !0, list = (name, max) => {
    let items = value[name];
    return items === void 0 ? [] : Array.isArray(items) ? (items.length > max && problems.push(`${name} has more than ${max} entries.`), items.slice(0, max)) : (problems.push(`${name} must be an array.`), []);
  }, unique = (items, name) => {
    let ids = /* @__PURE__ */ new Set();
    for (let [index, item] of items.entries()) {
      if (!item || typeof item != "object" || !ID.test(item.id ?? "")) {
        problems.push(`${name}[${index}].id must be a short identifier.`);
        continue;
      }
      ids.has(item.id) && problems.push(`${name}: duplicate id ${item.id}.`), ids.add(item.id);
    }
    return ids;
  }, segments = list("segments", TIMELINE_LIMITS.segments), graphics = list("graphics", TIMELINE_LIMITS.entries), sounds = list("sounds", TIMELINE_LIMITS.entries), words = list("words", TIMELINE_LIMITS.words);
  graphics.length + sounds.length > TIMELINE_LIMITS.entries && problems.push(`graphics and sounds together have more than ${TIMELINE_LIMITS.entries} entries.`), unique(segments, "segments"), unique(graphics, "graphics"), unique(sounds, "sounds");
  let previousEnd = 0;
  for (let [index, segment] of segments.entries()) {
    if (!segment || typeof segment != "object") continue;
    let label = `segments[${index}]`;
    if (SEGMENT_KINDS.has(segment.kind) || problems.push(`${label}.kind must be hook, body, cta or scene.`), (!optionalText(segment.module, 100) || !optionalText(segment.label, 200)) && problems.push(`${label}: module and label must be short texts.`), segment.source !== void 0) {
      let s = segment.source;
      (!s || typeof s != "object" || s.sourceSha256 !== void 0 && !SHA.test(s.sourceSha256) || s.range !== void 0 && !(Array.isArray(s.range) && s.range.length === 2 && s.range.every(finite) && s.range[0] < s.range[1]) || !["take", "clip", "captureId"].every((key) => optionalText(s[key], 500))) && problems.push(`${label}.source is invalid.`);
    }
    span(segment, label) && (Math.abs(segment.start - previousEnd) > tolerance && problems.push(`${label} must start where the previous segment ends (${previousEnd}).`), previousEnd = segment.end);
  }
  segments.length && Math.abs(previousEnd - duration) > tolerance && problems.push("Segments must cover the video up to durationSeconds.");
  for (let [index, graphic] of graphics.entries())
    !graphic || typeof graphic != "object" || (span(graphic, `graphics[${index}]`), graphic.rect !== void 0 && !rect(graphic.rect) && problems.push(`graphics[${index}].rect must be [x0, y0, x1, y1] in 0..1 with x0 < x1 and y0 < y1.`), (!optionalText(graphic.label, 200) || !optionalText(graphic.note, 500)) && problems.push(`graphics[${index}]: label and note must be short texts.`));
  for (let [index, sound] of sounds.entries())
    !sound || typeof sound != "object" || (span(sound, `sounds[${index}]`), (!optionalText(sound.sound, 200) || !optionalText(sound.label, 200)) && problems.push(`sounds[${index}]: sound and label must be short texts.`));
  for (let [index, word] of words.entries()) {
    if (!word || typeof word != "object" || !text(word.text, 200)) {
      problems.push(`words[${index}].text must be a short text.`);
      continue;
    }
    span(word, `words[${index}]`), word.module !== void 0 && !segments.some((segment) => segment.module === word.module || segment.id === word.module) && problems.push(`words[${index}].module refers to no segment.`);
  }
  return problems;
}

// cli/files.mjs
var limits = { files: 1e3, fileBytes: 1e8, totalBytes: 1024 * 1024 * 1024, textBytes: 25 * 1024 * 1024 }, types = { ".html": "text/html", ".htm": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".avif": "image/avif", ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".otf": "font/otf", ".eot": "application/vnd.ms-fontobject", ".mp4": "video/mp4", ".m4v": "video/mp4", ".vtt": "text/vtt", ".webm": "video/webm", ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".wav": "audio/wav", ".pdf": "application/pdf", ".json": "application/json", ".csv": "text/csv", ".txt": "text/plain" }, sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
function safePath(value) {
  if (typeof value != "string" || !value || value.length > 512 || /[\\\u0000-\u001f\u007f?#:%]/.test(value) || value.startsWith("/")) throw new Error(`Unsafe file path: ${value}`);
  if (value.split("/").some((part) => !part || part.startsWith(".") || /^(?:node_modules|private|secrets?)$/i.test(part) || /(?:^|[._-])(?:credentials?|secrets?|tokens?|private-key|env)(?:[._-]|$)/i.test(part))) throw new Error(`Unsafe file path: ${value}`);
  if (value.split("/")[0] === "__review") throw new Error(`Paths under __review/ are reserved: ${value}`);
  if (!types[path.posix.extname(value).toLowerCase()]) throw new Error(`Unsupported file type: ${value}`);
  return value;
}
async function readSafeFile(root, relative) {
  safePath(relative);
  let base = path.resolve(root);
  if ((await lstat(base)).isSymbolicLink()) throw new Error(`Output root must not be a symlink: ${base}`);
  let current = base;
  for (let part of relative.split("/"))
    if (current = path.join(current, part), (await lstat(current).catch((error) => {
      throw new Error(`Missing file: ${relative} (${error.code})`);
    })).isSymbolicLink()) throw new Error(`Symlinks are not allowed: ${relative}`);
  let actual = await realpath(current), actualRoot = await realpath(base);
  if (!actual.startsWith(actualRoot + path.sep)) throw new Error(`File escapes output root: ${relative}`);
  let stat = await lstat(actual);
  if (!stat.isFile() || stat.size > limits.fileBytes) throw new Error(`Not a file or larger than ${limits.fileBytes} bytes: ${relative}`);
  if (/\.(html?|css|svg)$/i.test(relative) && stat.size > limits.textBytes) throw new Error(`HTML, CSS and SVG files must not exceed 25 MiB; move embedded images and fonts into separate asset files: ${relative}`);
  let bytes = await readFile(actual);
  if (bytes.length > (/\.(html?|css|svg)$/i.test(relative) ? limits.textBytes : limits.fileBytes)) throw new Error(`File grew beyond the file size limit: ${relative}`);
  return bytes;
}
function resourcePath(reference, parent) {
  let value = reference.trim();
  if (!value || value.startsWith("#")) return null;
  if (/^data:/i.test(value)) {
    if (!/^data:(?:image\/(?:png|jpeg|gif|webp|avif)|font\/(?:woff2?|ttf|otf));base64,[a-z0-9+/=\s]+$/i.test(value)) throw new Error(`Unsupported inline resource in ${parent}`);
    return null;
  }
  if (/^https:\/\//i.test(value)) {
    let url = new URL(value);
    if (url.username || url.password) throw new Error(`Resource URL must not contain credentials in ${parent}`);
    return null;
  }
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value)) throw new Error(`Use an HTTPS resource URL in ${parent}: ${value}`);
  if (value.startsWith("/")) throw new Error(`Use a relative resource path in ${parent}: ${value}`);
  if (/[\\\u0000-\u001f\u007f]/.test(value)) throw new Error(`Unsafe resource in ${parent}: ${value}`);
  let decoded;
  try {
    decoded = decodeURIComponent(value.split(/[?#]/, 1)[0]);
  } catch {
    throw new Error(`Invalid resource encoding in ${parent}: ${value}`);
  }
  if (decoded.startsWith("/")) throw new Error(`Unsafe resource in ${parent}: ${value}`);
  let combined = path.posix.join(path.posix.dirname(parent), decoded);
  return safePath(combined);
}
function cssUnescape(value) {
  return value.replace(/\\(?:([a-f0-9]{1,6})\s?|([^\r\n]))/gi, (_, hex, char) => hex ? String.fromCodePoint(parseInt(hex, 16) || 65533) : char);
}
function cssReferences(source) {
  let css = cssUnescape(source.replace(/\/\*[\s\S]*?\*\//g, "")), found = [];
  for (let match of css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/gi)) found.push(match[1] ?? match[2] ?? match[3]);
  for (let match of css.matchAll(/@import\s+(?:"([^"]*)"|'([^']*)')/gi)) found.push(match[1] ?? match[2]);
  if (/\b(?:image-set|-webkit-image-set)\s*\(/i.test(css)) throw new Error("Use ordinary url() declarations instead of image-set() before publishing");
  return found;
}
function srcsetReferences(value) {
  let values = [], remaining = value.trim();
  for (; remaining; ) {
    let match = remaining.match(/^([^\s]+)(?:\s+[^,]*)?(?:,\s*|$)/);
    if (!match) throw new Error("Invalid srcset");
    values.push(match[1].replace(/,+$/, "")), remaining = remaining.slice(match[0].length).trim();
  }
  return values;
}
function references(source, relative) {
  let extension = path.posix.extname(relative).toLowerCase(), refs = [];
  if (extension === ".css" && (refs = cssReferences(source)), [".html", ".htm", ".svg"].includes(extension)) {
    let walk = (node) => {
      let attrs = Object.fromEntries((node.attrs ?? []).map((attr) => [attr.prefix ? `${attr.prefix}:${attr.name}` : attr.name, attr.value]));
      if (node.tagName === "base") throw new Error(`Remove <base> before publishing: ${relative}`);
      if (node.tagName === "meta" && attrs["http-equiv"]?.toLowerCase() === "refresh") throw new Error(`Remove meta refresh before publishing: ${relative}`);
      for (let attr of ["src", "poster", "background", "xlink:href"]) attrs[attr] && refs.push(attrs[attr]);
      attrs.href && !["a", "area"].includes(node.tagName) && refs.push(attrs.href), node.tagName === "object" && attrs.data && refs.push(attrs.data), attrs.srcset && refs.push(...srcsetReferences(attrs.srcset)), attrs.imagesrcset && refs.push(...srcsetReferences(attrs.imagesrcset)), attrs.style && refs.push(...cssReferences(attrs.style)), node.tagName === "style" && refs.push(...cssReferences((node.childNodes ?? []).map((child) => child.value ?? "").join("")));
      for (let child of node.childNodes ?? []) walk(child);
      node.content && walk(node.content);
    };
    walk(parse(source));
  }
  return [...new Set(refs.map((ref) => resourcePath(ref, relative)).filter(Boolean))].sort();
}
var analytics = new RegExp(`(?:^|[./])(?:${frame_hosts_default.analytics.map((host) => host.replace(/\./g, "\\.")).join("|")})\\b`, "i");
function scriptHosts(source, relative) {
  let warnings = [], walk = (node) => {
    if (node.tagName === "script") {
      let src = node.attrs?.find((attr) => attr.name === "src")?.value.trim() || "";
      if (analytics.test(src) || analytics.test((node.childNodes ?? []).map((child) => child.value ?? "").join(""))) warnings.push(`Analytics script in ${relative} is removed when the page is reviewed`);
      else if (/^(?:https?:)?\/\//i.test(src) && (!/^https:/i.test(src) || !frame_hosts_default.scripts.includes(new URL(src).hostname))) throw new Error(`Interactive pages load scripts only from their own files, ${frame_hosts_default.scripts.join(", ")}: ${src} in ${relative}`);
    }
    for (let child of node.childNodes ?? []) walk(child);
    node.content && walk(node.content);
  };
  return walk(parse(source)), warnings;
}
async function inspectFiles(root, inputPages, warnings = []) {
  if (!inputPages.length) throw new Error("Select at least one page with --page key=relative.html");
  if (inputPages.length > 100) throw new Error("A collection supports at most 100 pages");
  let seenKeys = /* @__PURE__ */ new Set(), cache = /* @__PURE__ */ new Map(), total = 0, visit = async (relative, closure) => {
    if (!closure.has(relative)) {
      if (closure.add(relative), !cache.has(relative)) {
        let bytes = await readSafeFile(root, relative);
        if (total += bytes.length, cache.size >= limits.files || total > limits.totalBytes) throw new Error("Upload exceeds the collection file or byte limit");
        cache.set(relative, { info: { path: relative, sha256: sha256(bytes), size: bytes.length, contentType: types[path.posix.extname(relative).toLowerCase()] }, refs: /\.(?:html?|css|svg)$/i.test(relative) ? references(bytes.toString("utf8"), relative) : [] });
      }
      for (let ref of cache.get(relative).refs) await visit(ref, closure);
    }
  }, pages = [];
  for (let page of inputPages) {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/.test(page.key) || seenKeys.has(page.key)) throw new Error(`Invalid or duplicate page key: ${page.key}`);
    seenKeys.add(page.key), safePath(page.path);
    let title = page.title || page.key;
    if (typeof title != "string" || !title.trim() || title.length > 200) throw new Error(`Invalid page title: ${page.key}`);
    if (page.kind === "video") {
      if (page.interactive || page.include?.length) throw new Error(`--interactive and --include are only for HTML pages: ${page.key}`);
      let video = videoBlock(page.video, page.key), closure2 = /* @__PURE__ */ new Set();
      for (let file of [page.path, video.poster, video.captions, video.timeline]) file !== void 0 && await visit(safePath(file), closure2);
      if (closure2.size !== [page.path, video.poster, video.captions, video.timeline].filter(Boolean).length) throw new Error(`Video files of a page must differ: ${page.key}`);
      await checkVideoFiles(root, page.path, video, cache.get(page.path).info, page.key), pages.push({ key: page.key, title, kind: "video", path: page.path, files: [...closure2].sort(), video });
      continue;
    }
    if (page.kind !== void 0 && page.kind !== "html") throw new Error(`Unknown page kind: ${page.key}`);
    if (!/\.html?$/i.test(page.path)) throw new Error(`Page must be HTML: ${page.path}`);
    if (page.include?.length && !page.interactive) throw new Error(`--include is only for interactive pages: ${page.key}`);
    let closure = /* @__PURE__ */ new Set();
    await visit(page.path, closure);
    for (let file of page.include || []) await visit(safePath(file), closure);
    page.interactive && warnings.push(...scriptHosts((await readSafeFile(root, page.path)).toString("utf8"), page.path)), pages.push({ key: page.key, title, path: page.path, files: [...closure].sort(), ...page.interactive ? { interactive: !0 } : {} });
  }
  return { files: [...cache.values()].map((item) => item.info).sort((a, b) => a.path.localeCompare(b.path)), pages: pages.sort((a, b) => a.key.localeCompare(b.key)) };
}
var videoKeys = ["poster", "captions", "timeline", "durationSeconds", "width", "height", "fps", "codec", "audio"];
function videoBlock(video, key) {
  if (!video || typeof video != "object" || Array.isArray(video) || Object.keys(video).some((name) => !videoKeys.includes(name))) throw new Error(`A video page needs a valid video block: ${key}`);
  if (!parseFps(video.fps) || !(video.durationSeconds > 0) || !Number.isInteger(video.width) || !Number.isInteger(video.height) || typeof video.codec != "string") throw new Error(`Video block lacks fps, duration, size or codec: ${key}`);
  let checks = { poster: /\.(?:jpe?g|png|webp)$/i, captions: /\.vtt$/i, timeline: /\.json$/i };
  for (let [name, pattern] of Object.entries(checks)) if (video[name] !== void 0 && (typeof video[name] != "string" || !pattern.test(video[name]))) throw new Error(`Video ${name} has the wrong file type: ${key}`);
  return Object.fromEntries(videoKeys.filter((name) => video[name] !== void 0).map((name) => [name, video[name]]));
}
async function mp4Boxes(file) {
  let handle = await open(file, "r");
  try {
    let { size } = await handle.stat(), header = Buffer.alloc(16), boxes = [];
    for (let offset = 0; offset + 8 <= size && boxes.length < 64; ) {
      await handle.read(header, 0, 16, offset);
      let length = header.readUInt32BE(0);
      if (length === 1 ? length = Number(header.readBigUInt64BE(8)) : length === 0 && (length = size - offset), length < 8) throw new Error("Invalid MP4 box size");
      boxes.push(header.toString("latin1", 4, 8)), offset += length;
    }
    return boxes;
  } finally {
    await handle.close();
  }
}
function containerProblems(boxes, majorBrand) {
  if (boxes[0] !== "ftyp") return ["the file is not an MP4 container (no leading ftyp box)"];
  let problems = [];
  /^qt/.test(majorBrand ?? "") && problems.push("the container is QuickTime MOV, not MP4");
  let moov = boxes.indexOf("moov"), mdat = boxes.indexOf("mdat");
  return (moov < 0 || mdat >= 0 && mdat < moov) && problems.push("moov is not before mdat (encode with -movflags +faststart)"), problems;
}
async function checkVideoFiles(root, relative, video, info, key) {
  if (!/\.(?:mp4|m4v)$/i.test(relative)) throw new Error(`A video page needs an .mp4 or .m4v file: ${key}`);
  let handle = await open(path.join(path.resolve(root), relative), "r"), brand;
  try {
    let head = Buffer.alloc(12);
    await handle.read(head, 0, 12, 0), brand = head.toString("latin1", 8, 12);
  } finally {
    await handle.close();
  }
  let problems = containerProblems(await mp4Boxes(path.join(path.resolve(root), relative)), brand);
  if (problems.length) throw new Error(`Video ${relative} cannot be reviewed: ${problems.join("; ")}. Run inspect with --video ${key}=... --review-copy`);
  if (video.captions !== void 0 && !/^\uFEFF?WEBVTT(?:[ \t]|\r?\n|$)/.test((await readSafeFile(root, video.captions)).toString("utf8"))) throw new Error(`Captions must be WebVTT starting with WEBVTT: ${video.captions}`);
  if (video.timeline !== void 0) {
    let bytes = await readSafeFile(root, video.timeline);
    if (bytes.length > TIMELINE_LIMITS.bytes) throw new Error(`Timeline exceeds 1 MB: ${video.timeline}`);
    let timeline;
    try {
      timeline = JSON.parse(bytes.toString("utf8"));
    } catch {
      throw new Error(`Timeline is not valid JSON: ${video.timeline}`);
    }
    let problems2 = validateTimeline(timeline, { durationSeconds: video.durationSeconds, fps: video.fps, reviewSha256: info.sha256 });
    if (problems2.length) throw new Error(`Timeline ${video.timeline} does not match video ${relative}: ${problems2.join(" ")} Publish the page again with --video ${key}=... --timeline ${key}=...`);
  }
}

// cli/state.mjs
import { lstat as lstat2, readFile as readFile2, mkdir, rename, rmdir, writeFile } from "node:fs/promises";
import path2 from "node:path";
import { randomUUID } from "node:crypto";
var statePath = (directory) => path2.join(path2.resolve(directory), ".brixon-feedback.json");
function submittedByLabel(value) {
  if (value !== void 0) {
    if (typeof value != "string" || /[\u0000-\u001f\u007f-\u009f\u2028\u2029]/.test(value) || !value.trim() || value.trim().length > 200) throw new Error("submittedBy requires a name or email with 1–200 characters and no control characters");
    return value.trim();
  }
}
function reviewLink(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Use a complete review URL");
  }
  let loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname), match = url.pathname.match(/^\/collections\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\/?$/i);
  if (!match || url.username || url.password || url.protocol !== "https:" && !(url.protocol === "http:" && loopback)) throw new Error("Use a valid review URL with a secure origin");
  return { reviewUrl: `${url.origin}/collections/${match[1]}`, collectionId: match[1], origin: url.origin };
}
var movedOrigins = { "https://feedback.brixontesting.com": "https://feedback.brixon.ai" };
function sameReview(a, b) {
  try {
    let [x, y] = [reviewLink(a), reviewLink(b)];
    return x.collectionId === y.collectionId && (movedOrigins[x.origin] ?? x.origin) === (movedOrigins[y.origin] ?? y.origin);
  } catch {
    return !1;
  }
}
function matchesCollection(item, selector) {
  if ([item.collectionId, item.collectionName, item.reviewUrl].includes(selector)) return !0;
  try {
    return sameReview(selector, item.reviewUrl);
  } catch {
    return !1;
  }
}
function assertPublicationBaseline(collection, manifest) {
  if (!(manifest.schemaVersion === 1 ? manifest.projectId === collection.projectId && manifest.collectionId === collection.collectionId && !("reviewUrl" in manifest) : manifest.schemaVersion === 2 && !("projectId" in manifest) && !("collectionId" in manifest) && sameReview(manifest.reviewUrl, collection.reviewUrl))) throw new Error("Manifest does not match the mapped review URL or project");
  if (manifest.baseRevision !== collection.revision) throw new Error(`Manifest baseRevision does not match the local mapping: expected ${collection.revision}, received ${manifest.baseRevision}. No upload was sent. Regenerate the manifest from the saved mapping; for an upload that may already be published, resume through feedback_resume_upload and recover with finalize using the same upload ID`);
}
async function readState(file) {
  let raw;
  try {
    let stat = await lstat2(file);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error("Local feedback state must be a regular file");
    raw = await readFile2(file, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return { schemaVersion: 1, activeCollectionId: null, collections: [] };
    throw error;
  }
  let state = JSON.parse(raw);
  if (state.schemaVersion !== 1 || !Array.isArray(state.collections)) throw new Error("Unsupported local feedback state");
  let collections = state.collections.map((item) => {
    if (!["projectId", "collectionId", "collectionName", "root", "reviewUrl"].every((key) => typeof item[key] == "string" && item[key]) || !Number.isInteger(item.revision) || item.revision < 1 || !Array.isArray(item.files) || !Array.isArray(item.pages)) throw new Error("Invalid local source mapping");
    if (reviewLink(item.reviewUrl).collectionId !== item.collectionId) throw new Error("Local source mapping has a mismatched review URL");
    if (item.folderId !== void 0 && item.folderId !== null && !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(item.folderId)) throw new Error("Local source mapping has an invalid folderId");
    let files = item.files.map(({ path: filePath, sha256: hash, size, contentType }) => {
      if (safePath(filePath), !/^[a-f0-9]{64}$/.test(hash) || !Number.isInteger(size) || size < 0 || typeof contentType != "string") throw new Error("Invalid local file fingerprint");
      return { path: filePath, sha256: hash, size, contentType };
    }), pages = item.pages.map(({ key, title, path: filePath, files: dependencies, versionId, number, interactive, kind, video }) => {
      if (safePath(filePath), typeof key != "string" || typeof title != "string" || typeof versionId != "string" || !Number.isInteger(number) || number < 1 || !Array.isArray(dependencies) || !dependencies.includes(filePath) || dependencies.some((dependency) => !files.some((file2) => file2.path === dependency))) throw new Error("Invalid local page mapping");
      if (interactive !== void 0 && interactive !== !0) throw new Error("Invalid local page mapping");
      if (kind !== void 0 && (kind !== "video" || interactive)) throw new Error("Invalid local page mapping");
      let media = kind === "video" ? videoBlock(video, key) : void 0;
      if (kind !== "video" && video !== void 0) throw new Error("Invalid local page mapping");
      if (media && [media.poster, media.captions, media.timeline].some((file2) => file2 !== void 0 && !dependencies.includes(file2))) throw new Error("Invalid local page mapping");
      return { key, title, path: filePath, files: dependencies, versionId, number, ...interactive ? { interactive } : {}, ...media ? { kind, video: media } : {} };
    });
    return { projectId: item.projectId, collectionId: item.collectionId, collectionName: item.collectionName, root: item.root, reviewUrl: item.reviewUrl, revision: item.revision, files, pages, ...item.submittedBy === void 0 ? {} : { submittedBy: submittedByLabel(item.submittedBy) }, ...item.folderId === void 0 ? {} : { folderId: item.folderId } };
  });
  if (new Set(collections.map((item) => item.collectionId)).size !== collections.length) throw new Error("Duplicate local collection mapping");
  return { schemaVersion: 1, activeCollectionId: state.activeCollectionId ?? null, collections };
}
function selectCollection(state, selector) {
  if (!selector && !state.activeCollectionId) {
    if (state.collections.length === 1) return state.collections[0];
    throw new Error(state.collections.length ? "Several local collections match; supply --collection with a known review URL or saved name" : "No local collection mapping; supply a review link and restore its source mapping");
  }
  let key = selector || state.activeCollectionId, matches = state.collections.filter((item) => matchesCollection(item, key));
  if (matches.length !== 1) throw new Error(matches.length ? `Ambiguous collection: ${key}` : `No local source mapping for collection: ${key}`);
  return matches[0];
}
async function checkBaseline(collection, root = collection.root) {
  let changed = [], missing = [];
  for (let file of collection.files)
    try {
      sha256(await readSafeFile(root, file.path)) !== file.sha256 && changed.push(file.path);
    } catch (error) {
      missing.push({ path: file.path, error: error.message });
    }
  let affected = /* @__PURE__ */ new Set([...changed, ...missing.map((file) => file.path)]);
  return { ok: affected.size === 0, collectionId: collection.collectionId, revision: collection.revision, changed, missing, affectedPages: collection.pages.filter((page) => page.files.some((file) => affected.has(file))).map((page) => page.key) };
}
async function mapCollection(file, selector, snapshot, root) {
  let target = reviewLink(selector), remote = snapshot.collection, uuid = (value) => typeof value == "string" && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(value);
  if (!remote || remote.id !== target.collectionId || !sameReview(remote.reviewUrl, target.reviewUrl) || !uuid(remote.projectId) || !Number.isInteger(remote.revision) || remote.revision < 1 || typeof remote.name != "string" || !remote.name.trim() || remote.name.length > 200 || remote.project != null && !uuid(remote.project.id) || !Array.isArray(snapshot.files) || !Array.isArray(snapshot.pages)) throw new Error("Collection snapshot does not match the selected review URL");
  if ((await readState(file)).collections.some((item) => item.collectionId === remote.id)) throw new Error("This collection already has a source mapping; do not replace its baseline");
  let pages = snapshot.pages.map((page) => {
    let versions = page.versions?.filter((version3) => version3.id === page.currentVersionId), version2 = versions?.[0];
    if (versions?.length !== 1 || !uuid(version2.id) || !Number.isInteger(version2.number) || version2.number < 1 || !Array.isArray(version2.files)) throw new Error("Collection snapshot has an invalid current page version");
    let media = version2.kind === "video" ? videoBlock(version2.video, page.key) : void 0;
    return { key: page.key, title: page.title, ...media ? { kind: "video" } : {}, path: version2.path, files: [...version2.files].sort(), ...media ? { video: media } : {}, ...version2.interactive ? { interactive: !0 } : {}, versionId: version2.id, number: version2.number };
  }).sort((a, b) => a.key.localeCompare(b.key)), inspected = await inspectFiles(root, pages.map((page) => page.interactive ? { ...page, include: page.files } : page)), files = snapshot.files.map(({ path: filePath, sha256: hash, size, contentType }) => ({ path: filePath, sha256: hash, size, contentType })).sort((a, b) => a.path.localeCompare(b.path));
  if (JSON.stringify(inspected.files) !== JSON.stringify(files) || JSON.stringify(inspected.pages) !== JSON.stringify(pages.map(({ versionId, number, ...page }) => page))) throw new Error("Local files or dependencies differ from the published snapshot; source mapping was not created");
  let manifest = { schemaVersion: 2, collectionName: remote.name, ...inspected }, publication = { projectId: remote.projectId, collectionId: remote.id, revision: remote.revision, reviewUrl: target.reviewUrl, pages, project: remote.project };
  return recordPublication(file, manifest, publication, root, { newMapping: !0 });
}
async function recordPublication(file, manifest, publication, root, { newMapping = !1 } = {}) {
  await mkdir(path2.dirname(file), { recursive: !0 });
  let lock = `${file}.lock`;
  try {
    await mkdir(lock);
  } catch (error) {
    throw error.code === "EEXIST" ? new Error(`Local source mapping is locked: ${lock}. Retry finalize after the other writer finishes; an interrupted writer's lock requires explicit recovery`) : error;
  }
  try {
    return await writePublication(file, manifest, publication, root, newMapping);
  } finally {
    await rmdir(lock);
  }
}
async function writePublication(file, manifest, publication, root, newMapping) {
  let state = await readState(file), index = state.collections.findIndex((item) => item.collectionId === publication.collectionId), folderId = publication.project !== void 0 ? publication.project?.id ?? null : manifest.folderId !== void 0 ? manifest.folderId : state.collections[index]?.folderId, collection = {
    projectId: publication.projectId,
    collectionId: publication.collectionId,
    collectionName: manifest.collectionName,
    ...manifest.submittedBy === void 0 ? {} : { submittedBy: submittedByLabel(manifest.submittedBy) },
    revision: publication.revision,
    reviewUrl: publication.reviewUrl,
    root: path2.resolve(root),
    files: manifest.files.map(({ path: filePath, sha256: hash, size, contentType }) => ({ path: filePath, sha256: hash, size, contentType })),
    pages: manifest.pages.map((page) => ({ key: page.key, title: page.title, path: page.path, files: page.files, versionId: publication.pages.find((version2) => version2.key === page.key).versionId, number: publication.pages.find((version2) => version2.key === page.key).number, ...page.interactive ? { interactive: !0 } : {}, ...page.kind === "video" ? { kind: "video", video: page.video } : {} })),
    ...folderId === void 0 ? {} : { folderId }
  };
  if (newMapping && index >= 0) throw new Error("This collection already has a source mapping; do not replace its baseline");
  if (index >= 0 && state.collections[index].revision > collection.revision) throw new Error("A newer local publication is already recorded; do not replace its source mapping");
  index < 0 ? state.collections.push(collection) : state.collections[index] = collection, state.activeCollectionId = collection.collectionId, await mkdir(path2.dirname(file), { recursive: !0 });
  let temporary = `${file}.${randomUUID()}.tmp`;
  return await writeFile(temporary, JSON.stringify(state, null, 2) + `
`, { mode: 384, flag: "wx" }), await rename(temporary, file), collection;
}

// cli/config.mjs
import { readFile as readFile3 } from "node:fs/promises";
import os from "node:os";
import path3 from "node:path";
var NETWORK_KEYS = ["ca.mode", "ca.file", "proxy.mode", "proxy.url", "proxy.noProxy"], NETWORK_DEFAULTS = { "ca.mode": "system", "proxy.mode": "env" }, SECTIONS = { ca: ["mode", "file"], proxy: ["mode", "url", "noProxy"] }, FLAGS = { proxy: "proxy.url", "no-proxy": "proxy.noProxy", "ca-file": "ca.file" }, ENVIRONMENT = { BRIXON_PROXY: "proxy.url", BRIXON_NO_PROXY: "proxy.noProxy", BRIXON_CA_FILE: "ca.file" }, networkFlags = Object.keys(FLAGS);
function configPaths({ platform = process.platform, env = process.env, home = os.homedir() } = {}) {
  return platform === "win32" ? { managed: "C:\\Program Files\\Brixon\\config.json", user: path3.win32.join(env.APPDATA || path3.win32.join(home, "AppData", "Roaming"), "Brixon", "config.json") } : platform === "darwin" ? { managed: "/Library/Application Support/Brixon/config.json", user: path3.posix.join(home, "Library/Application Support/Brixon/config.json") } : { managed: "/etc/brixon/config.json", user: path3.posix.join(env.XDG_CONFIG_HOME || path3.posix.join(home, ".config"), "brixon", "config.json") };
}
function redactProxy(value) {
  try {
    let url = new URL(value);
    return `${url.protocol}//${url.username || url.password ? "***@" : ""}${url.host}`;
  } catch {
    return "[invalid proxy URL]";
  }
}
var networkValidators = {
  "ca.mode": (value) => {
    if (!["system", "file", "bundled"].includes(value)) throw new Error('must be "system", "file" or "bundled"');
    return value;
  },
  "ca.file": (value, { fromFile }) => {
    if (typeof value != "string" || !value.trim() || /[\0\r\n]/.test(value)) throw new Error("must be the path of a PEM file");
    if (fromFile && !(path3.isAbsolute(value) && (process.platform !== "win32" || /^(?:[a-zA-Z]:[\\/]|\\\\)/.test(value)))) throw new Error("must be an absolute path in a configuration file");
    return path3.resolve(value);
  },
  "proxy.mode": (value) => {
    if (!["env", "explicit", "none"].includes(value)) throw new Error('must be "env", "explicit" or "none"');
    return value;
  },
  "proxy.url": (value, { fromFile, fromFlag }) => {
    let url;
    try {
      url = new URL(value);
    } catch {
      throw new Error("must be a proxy URL such as http://proxy.example:8080");
    }
    if (!["http:", "https:"].includes(url.protocol) || url.pathname !== "/" || url.search || url.hash) throw new Error("must be an http:// or https:// proxy address without path or query");
    if ((fromFile || fromFlag) && (url.username || url.password)) throw new Error(`must not contain credentials ${fromFile ? "in a configuration file" : "on the command line"}; exempt the target host from proxy authentication or supply the proxy through the environment`);
    return url.href;
  },
  "proxy.noProxy": (value) => {
    let entries = (Array.isArray(value) ? value : typeof value == "string" ? value.split(",") : [null]).map((entry) => typeof entry == "string" ? entry.trim() : null);
    if (entries.some((entry) => entry === null || /[\s\0]/.test(entry))) throw new Error("must be a comma-separated list or an array of host names");
    return entries.filter(Boolean).join(",");
  }
};
function originList(value, { fromFile } = {}) {
  if (fromFile && !Array.isArray(value)) throw new Error("must be an array of origins");
  let entries = Array.isArray(value) ? value : typeof value == "string" ? value.split(",").map((entry) => entry.trim()).filter(Boolean) : [];
  if (!entries.length || entries.length > 20) throw new Error("must list 1 to 20 origins");
  return [...new Set(entries.map((entry) => {
    let url;
    try {
      url = new URL(entry);
    } catch {
      throw new Error("must contain origins such as https://host.example");
    }
    let loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (url.username || url.password || url.pathname !== "/" || url.search || url.hash || url.protocol !== "https:" && !(url.protocol === "http:" && loopback)) throw new Error(`must contain plain https origins (http only for localhost): ${url.host}`);
    return url.origin;
  }))];
}
var same = (a, b) => JSON.stringify(a) === JSON.stringify(b), isSection = (value) => !!value && typeof value == "object" && !Array.isArray(value);
async function loadConfig({ tools = [], flags = {}, env = process.env, paths = configPaths({ env }), read = readFile3 } = {}) {
  let names = tools.map((tool3) => tool3?.name), claimed = new Set(Object.keys(ENVIRONMENT));
  for (let tool3 of tools) {
    let keys = tool3?.keys && typeof tool3.keys == "object" ? Object.keys(tool3.keys) : null, variables2 = keys?.map((key) => tool3.keys[key]?.env).filter(Boolean);
    if (!keys || typeof tool3.name != "string" || !/^[a-z][a-zA-Z0-9]*$/.test(tool3.name) || Object.hasOwn(SECTIONS, tool3.name) || names.filter((name) => name?.toLowerCase() === tool3.name.toLowerCase()).length > 1 || keys.some((key) => typeof tool3.keys[key]?.validate != "function" || keys.some((other) => other.startsWith(`${key}.`))) || variables2.some((variable, index) => claimed.has(variable) || variables2.indexOf(variable) !== index)) throw new Error("Invalid tool definition for the Brixon configuration");
    for (let variable of variables2) claimed.add(variable);
  }
  let toolKeys = tools.flatMap((tool3) => Object.keys(tool3.keys).map((key) => ({ key: `${tool3.name}.${key}`, ...tool3.keys[key] }))), validators = { ...networkValidators, ...Object.fromEntries(toolKeys.map((entry) => [entry.key, entry.validate])) }, layer = (entries, label, origin = {}) => {
    let values = /* @__PURE__ */ new Map();
    for (let [key, raw, source] of entries)
      try {
        values.set(key, { value: validators[key](raw, origin), source });
      } catch (error) {
        throw new Error(`${label ?? source}: ${key} ${error.message}`);
      }
    for (let [detail, mode, implied] of [["ca.file", "ca.mode", "file"], ["proxy.url", "proxy.mode", "explicit"]]) values.has(detail) && !values.has(mode) && values.set(mode, { value: implied, source: values.get(detail).source });
    return values;
  }, fileLayer = async (name, file) => {
    let text2;
    try {
      text2 = await read(file, "utf8");
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "ENOTDIR") return { present: !1, otherSections: [], values: /* @__PURE__ */ new Map() };
      throw new Error(`The ${name} configuration ${file} cannot be read (${error.code ?? "error"})`);
    }
    let label = `${name} configuration ${file}`, data;
    try {
      data = JSON.parse(text2.replace(/^\uFEFF/, ""));
    } catch {
      throw new Error(`The ${label} is not valid JSON (UTF-8 expected)`);
    }
    if (!isSection(data)) throw new Error(`The ${label} must be a JSON object`);
    let entries = [], otherSections = [], collect = (node, prefix) => {
      for (let [child, entry] of Object.entries(node)) {
        let key = `${prefix}.${child}`;
        if (child.includes(".")) throw new Error(`${label}: unknown key ${key}; nest sections instead of dotted names`);
        if (toolKeys.some((known) => known.key === key)) entries.push([key, entry, name]);
        else if (isSection(entry) && toolKeys.some((known) => known.key.startsWith(`${key}.`))) collect(entry, key);
        else throw new Error(`${label}: unknown key ${key}`);
      }
    };
    for (let [key, value] of Object.entries(data)) {
      let known = Object.hasOwn(SECTIONS, key) || names.includes(key), intended = [...Object.keys(SECTIONS), ...names].find((section) => section !== key && section.toLowerCase() === key.toLowerCase());
      if (intended) throw new Error(`${label}: unknown key ${key}; did you mean ${intended}?`);
      if (!isSection(value)) throw new Error(`${label}: ${known ? `${key} must be an object` : `unknown key ${key}`}`);
      if (Object.hasOwn(SECTIONS, key))
        for (let [child, entry] of Object.entries(value)) {
          if (!SECTIONS[key].includes(child)) throw new Error(`${label}: unknown key ${key}.${child}`);
          entries.push([`${key}.${child}`, entry, name]);
        }
      else names.includes(key) ? collect(value, key) : otherSections.push(key);
    }
    return { present: !0, otherSections, values: layer(entries, label, { fromFile: !0 }) };
  }, managed = await fileLayer("managed", paths.managed), user = await fileLayer("user", paths.user), flagLayer = layer(Object.entries(FLAGS).filter(([flag]) => flags[flag] !== void 0).map(([flag, key]) => [key, flags[flag], `flag --${flag}`]), null, { fromFlag: !0 }), variables = { ...ENVIRONMENT, ...Object.fromEntries(toolKeys.filter((entry) => entry.env).map((entry) => [entry.env, entry.key])) }, envLayer = layer(Object.entries(variables).filter(([name]) => env[name]).map(([name, key]) => [key, env[name], `env ${name}`])), defaults = { ...NETWORK_DEFAULTS, ...Object.fromEntries(toolKeys.filter((entry) => entry.default !== void 0).map((entry) => [entry.key, entry.default])) }, settings = {}, sources = {}, ignored = [];
  for (let key of [...NETWORK_KEYS, ...toolKeys.map((entry) => entry.key)]) {
    let locked = managed.values.get(key), flag = flagLayer.get(key);
    if (locked && flag && !same(locked.value, flag.value)) throw new Error(`${flag.source.replace(/^flag /, "")} cannot change ${key}: it is locked by the managed configuration ${paths.managed}`);
    let [winner, ...rest] = [locked, flag, envLayer.get(key), user.values.get(key)].filter(Boolean);
    for (let entry of rest) same(entry.value, winner.value) || ignored.push({ key, source: entry.source, reason: winner.source === "managed" ? "locked by the managed configuration" : `overridden by ${winner.source}` });
    winner ? (settings[key] = winner.value, sources[key] = winner.source) : defaults[key] !== void 0 && (settings[key] = defaults[key], sources[key] = "default");
  }
  for (let [mode, value, detail] of [["ca.mode", "file", "ca.file"], ["proxy.mode", "explicit", "proxy.url"]])
    if (settings[mode] === value) {
      if (!settings[detail]) throw new Error(`${mode} is "${value}" (${sources[mode]}) but no ${detail} is set`);
      if (sources[mode] === "managed" && sources[detail] !== "managed") throw new Error(`The managed configuration ${paths.managed} sets ${mode} "${value}" and must also set ${detail}`);
    }
  let described = (file, entry) => ({ path: file, present: entry.present, ...entry.otherSections.length ? { otherSections: entry.otherSections } : {} });
  return { settings, sources, ignored, files: { managed: described(paths.managed, managed), user: described(paths.user, user) } };
}

// cli/feedback-config.mjs
var defaultOrigins = ["https://feedback.brixon.ai"], defaultParallel = 4;
function parallel(value) {
  if (!Number.isInteger(value) || value < 1 || value > 6) throw new Error("must be an integer from 1 to 6");
  return value;
}
var feedbackTool = {
  name: "feedback",
  keys: {
    allowedOrigins: { validate: originList, default: defaultOrigins, env: "BRIXON_FEEDBACK_ALLOWED_ORIGINS" },
    "uploads.parallel": { validate: parallel, default: defaultParallel }
  }
};

// cli/network.mjs
import { X509Certificate } from "node:crypto";
import { readFileSync } from "node:fs";
import http from "node:http";
import tls from "node:tls";
var nodeRequirement = ">=24.14";
function nodeSupported(version2 = process.versions.node) {
  let [major, minor] = version2.split(".").map(Number);
  return major > 25 || major === 25 && minor >= 4 || major === 24 && minor >= 14;
}
function requireNode(program2, doctor2, version2 = process.versions.node) {
  if (!nodeSupported(version2)) throw new Error(`${program2} requires Node.js 24.14 or newer (current 24 LTS); this is Node.js ${version2}. Older versions cannot set the proxy and the trusted certificates inside the process. Install the current Node.js 24 LTS and retry; ${doctor2} shows the details`);
}
var transientCodes = /* @__PURE__ */ new Set(["ECONNRESET", "ECONNREFUSED", "ECONNABORTED", "ETIMEDOUT", "EPIPE", "EAI_AGAIN", "ENETUNREACH", "EHOSTUNREACH", "UND_ERR_SOCKET", "UND_ERR_CONNECT_TIMEOUT"]), transientStatuses = /* @__PURE__ */ new Set([408, 429, 502, 503, 504]), untrustedCodes = /* @__PURE__ */ new Set(["UNABLE_TO_VERIFY_LEAF_SIGNATURE", "UNABLE_TO_GET_ISSUER_CERT", "UNABLE_TO_GET_ISSUER_CERT_LOCALLY", "SELF_SIGNED_CERT_IN_CHAIN", "DEPTH_ZERO_SELF_SIGNED_CERT", "CERT_HAS_EXPIRED", "ERR_TLS_CERT_ALTNAME_INVALID"]);
function networkFailure(error) {
  let chain = [error?.cause, error, error?.cause?.cause].filter(Boolean), refused = chain.find((item) => item.code === "ERR_PROXY_TUNNEL" && Number.isInteger(item.statusCode));
  return {
    code: chain.find((item) => typeof item.code == "string")?.code,
    proxyStatus: refused ? String(refused.statusCode) : chain.map((item) => String(item.message ?? "").match(/Proxy response \((\d{3})\)/)?.[1]).find(Boolean)
  };
}
function failureHint({ code, proxyStatus }, doctor2) {
  return untrustedCodes.has(code) ? `The server certificate is not trusted; behind TLS inspection the company certificate authority must be in the trusted store. Run ${doctor2}. ` : proxyStatus ? `The proxy refused the connection (HTTP ${proxyStatus})${proxyStatus === "407" ? "; proxies that require NTLM or Kerberos sign-in are not supported" : ""}. Run ${doctor2}. ` : code === "ERR_PROXY_TUNNEL" ? `The proxy did not open the connection. Run ${doctor2}. ` : "";
}
function pemCertificates(text2, file) {
  let blocks = text2.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g) ?? [];
  if (!blocks.length) throw new Error(`CA file contains no PEM certificate: ${file}`);
  for (let [index, block] of blocks.entries())
    try {
      new X509Certificate(block);
    } catch {
      throw new Error(`CA file contains an invalid certificate (entry ${index + 1}): ${file}`);
    }
  return blocks;
}
function trustedCertificates({ settings, sources }, { tlsImpl = tls, read = readFileSync } = {}) {
  let mode = settings["ca.mode"], certificates = [...tlsImpl.getCACertificates("bundled")];
  if (mode === "system" && certificates.push(...tlsImpl.getCACertificates("system")), mode === "file") {
    let text2;
    try {
      text2 = read(settings["ca.file"], "utf8");
    } catch (error) {
      throw new Error(`CA file cannot be read (${error.code ?? "error"}): ${settings["ca.file"]}`);
    }
    certificates.push(...pemCertificates(text2, settings["ca.file"]));
  }
  let available = tlsImpl.getCACertificates("extra"), extra = available.length ? mode === "bundled" ? 'ignored: ca.mode is "bundled"' : sources["ca.mode"] === "managed" ? "ignored: ca.mode is locked by the managed configuration" : "applied" : "not set";
  return extra === "applied" && certificates.push(...available), { certificates: [...new Set(certificates)], extra };
}
function proxySettings({ settings, sources }, env = process.env) {
  let mode = settings["proxy.mode"];
  if (mode === "none") return { mode };
  if (mode === "explicit") return { mode, https: settings["proxy.url"], http: settings["proxy.url"], source: sources["proxy.url"], noProxy: settings["proxy.noProxy"] };
  let pick = (name) => {
    for (let variable of [name, name.toUpperCase()]) if (env[variable]) return { value: /^[a-z][a-z0-9+.-]*:\/\//i.test(env[variable]) ? env[variable] : `http://${env[variable]}`, variable };
    return {};
  }, https3 = pick("https_proxy"), plain = pick("http_proxy"), exceptions = env.no_proxy || env.NO_PROXY || void 0;
  for (let proxy of [https3, plain]) if (proxy.value && !(URL.canParse(proxy.value) && ["http:", "https:"].includes(new URL(proxy.value).protocol))) throw new Error(`${proxy.variable} is not a valid http or https proxy URL`);
  return { mode, https: https3.value, http: plain.value, source: https3.variable ? `env ${https3.variable}` : void 0, noProxy: settings["proxy.noProxy"] ?? exceptions };
}
function applyNetwork(config, { env = process.env, tlsImpl = tls, httpImpl = http } = {}) {
  let trust = trustedCertificates(config, { tlsImpl });
  tlsImpl.setDefaultCACertificates(trust.certificates);
  let proxy = proxySettings(config, env);
  if (proxy.mode === "none") httpImpl.setGlobalProxyFromEnv({ http_proxy: "http://proxy.invalid", https_proxy: "http://proxy.invalid", no_proxy: "*" });
  else if (proxy.https || proxy.http)
    try {
      httpImpl.setGlobalProxyFromEnv({ http_proxy: proxy.http, https_proxy: proxy.https, no_proxy: proxy.noProxy || "no-exception.invalid" });
    } catch (error) {
      throw new Error(`The proxy address from ${proxy.source ?? "the environment"} cannot be used (${error.code ?? error.name})`);
    }
  return { trust, proxy };
}

// cli/edition.mjs
var edition = "client";
if (edition !== "client" && edition !== "team") throw new Error('This build of the Brixon CLI names an unknown edition; expected "client" or "team"');
var program = "Brixon CLI", doctorCommand = "the doctor command of the Brixon CLI", videoOptions = ["video", "review-copy", "timeline", "captions", "include-page"], noVideo = "video pages are not part of this edition of the Brixon CLI", clientHelp = (version2) => `Brixon CLI ${version2}

inspect --root DIR --page KEY=PATH [--page KEY=PATH ...] [--title KEY=TITLE] [--interactive KEY] [--include KEY=PATH] [--submitted-by NAME_OR_EMAIL]
manifest --root DIR --name NAME --page KEY=PATH [...] [--interactive KEY] [--include KEY=PATH] [--campaign YYYY-qN-TOPIC] [--private] [--folder PROJECT_ID | --no-folder] [--new-series] [--submitted-by NAME_OR_EMAIL] [--page-order KEY,KEY,...]
manifest [--collection ID|NAME|REVIEW_URL] [--root DIR] [--base-revision N]
target [--collection ID|NAME|REVIEW_URL]
map --collection REVIEW_URL --snapshot FILE --root DIR
state
check-baseline [--collection ID|NAME|REVIEW_URL] [--root DIR]
round --feedback FILE [--collection ID|NAME|REVIEW_URL] [--comment ID ...]
renew-round --round FILE --feedback FILE [--comment ID ...]
check-claim --round FILE --claim FILE
impact --manifest FILE [--round FILE]
upload --manifest FILE [--root DIR] [--round FILE --claim FILE] [--proxy URL] [--no-proxy HOSTS] [--ca-file PEM]
finalize --manifest FILE [--root DIR] [--proxy URL] [--no-proxy HOSTS] [--ca-file PEM]
doctor [--proxy URL] [--no-proxy HOSTS] [--ca-file PEM]
put --file PATH [--proxy URL] [--no-proxy HOSTS] [--ca-file PEM]

All commands return JSON. --state FILE overrides the workspace .brixon-feedback.json.
manifest writes JSON to stdout; save it outside the selected output directory.
A review is one collection with one review URL; a project is a folder that groups reviews.
The feedback_* tools named here belong to the Brixon Feedback connection of your AI client, which Brixon activates.
Run manifest inside the repository the work belongs to: a new review carries the name of that repository, the
service places it in a project from that name (without a repository it gets no project and stays private), and the
answer to feedback_prepare_upload names the project and who can see the review.
--campaign names an existing campaign folder of the repository (YYYY-qN-topic, for example 2026-q3-launch), so the
review goes under that campaign; if --root lies inside a campaign folder, it is detected.
--private makes the review private (owner, explicit shares and administrators only).
--folder PROJECT_ID overrides the placement only when the person names a project; --no-folder publishes without one.
Its manifest carries a new requestId, so resending it after an uncertain answer is safe.
--new-series confirms a separate review after a possible_duplicate answer; never add it silently.
Existing reviews retain their project; use feedback_update_project with its metadata revision to rename or move one.
--submitted-by records informational uploader attribution, never access rights or authenticated identity.
Successor manifests reuse the saved label unless explicitly overridden.
Review discovery (feedback_list_projects), projects (feedback_list_folders) and agent identity (feedback_whoami) use
the Brixon Feedback connection.
An existing collection retains its pages and uses its last published local revision.
--interactive KEY runs that page's own scripts for reviewers in an isolated frame (scripts only from its files and
cdn.jsdelivr.net, cdnjs.cloudflare.com, unpkg.com; analytics is removed). --include KEY=PATH adds a file the page loads
with fetch(), such as data.json, to an interactive page. Without --page a revision keeps both from the saved mapping.
--page-order lists every selected page key once, in review order, for a new collection only.
Existing collections retain their saved order; use feedback_set_page_order to change it.
check-baseline exits 2 on changed/missing files.
No command performs permanent authentication or saves an upload token.
upload and finalize read the short-lived upload ticket JSON from stdin.
finalize recovers an uncertain completion without uploading files again.
An apply round uses --round FILE on manifest, impact, and upload; upload also requires --claim FILE.
Network: upload and finalize trust the operating system certificate store in addition to the Node.js roots and use the
proxy from HTTPS_PROXY/NO_PROXY. They send only to allowed origins (default https://feedback.brixon.ai), up to four files
in parallel, and repeat a file transfer after a transient network error. The settings come from the Brixon
configuration shared by all Brixon command-line tools (config.json: ca and proxy at the top level, this tool's keys
under "feedback"). In order of precedence: the managed file (written by IT; its keys are locked),
--proxy/--no-proxy/--ca-file, BRIXON_PROXY, BRIXON_NO_PROXY, BRIXON_CA_FILE and BRIXON_FEEDBACK_ALLOWED_ORIGINS,
then the user file. Proxy credentials are accepted only from the environment.
doctor reports the Node.js version, the effective settings with their origin, name resolution, proxy, the server
certificate issuer, the upload endpoint and the targets of put as JSON without secrets; it exits 2 on a problem.
put sends one local file to an upload URL that a Brixon MCP server prepared (for example a presigned storage URL).
It reads the ticket JSON from hidden stdin: uploadUrl (required), expiresAt, contentType, method (PUT by default, or
POST) and headers (optional); other fields are ignored. Pass the object that contains uploadUrl; where a tool
returns several slots, pass one slot or its ticket per call. The file (jpg, jpeg, png, gif, webp, mp4, mov, pdf, doc,
docx, ppt, pptx) is streamed with its exact length as the raw body of one request; form and multi-part uploads are
refused. A PUT is repeated after a transient network error. The target must be https and listed in
upload.allowedOrigins (BRIXON_UPLOAD_ALLOWED_ORIGINS); an expired ticket is refused. When the service refuses the
file, the error repeats its answer as far as that is safe. The upload URL and the ticket headers are credentials
and never appear in output.
Result: {ok, file, bytes, method, status, contentType, origin, attempts}; "inferred" is added when a retry found the
file already stored (HTTP 412 for a ticket with If-None-Match: *) after an earlier attempt had sent it completely.
Node.js 24.14 or newer is required. Details: docs/setup.md of the brixon-ai-client-core plugin.
`;

// cli/upload.mjs
var wait = (milliseconds) => new Promise((resolve2) => setTimeout(resolve2, milliseconds));
function ticketURL(value, pathname) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Upload ticket contains an invalid URL");
  }
  let loopback = url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]";
  if (url.username || url.password || url.search || url.hash || url.protocol !== "https:" && !(url.protocol === "http:" && loopback) || url.pathname !== pathname) throw new Error("Upload ticket URL has an unsafe origin or endpoint");
  return url;
}
function validateInitialPageOrder(manifest) {
  if (manifest.pageOrder === void 0) return;
  if (manifest.schemaVersion !== 2 || manifest.reviewUrl !== void 0) throw new Error("pageOrder is only supported for a new collection; use feedback_set_page_order for an existing collection");
  let order = manifest.pageOrder;
  if (!Array.isArray(order) || !order.length || order.length > 100 || order.length !== manifest.pages.length || new Set(order).size !== order.length || order.some((key) => typeof key != "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(key) || !manifest.pages.some((page) => page.key === key))) throw new Error("pageOrder must contain every page key exactly once");
}
async function upload({ manifest, ticket, root, stateFile, finalizeOnly = !1, fetchImpl = fetch, allowedOrigins = defaultOrigins, parallel: parallel2 = defaultParallel, retryDelays = [1e3, 3e3, 8e3] }) {
  let uuid = (value) => typeof value == "string" && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(value), legacy = manifest.schemaVersion === 1;
  if (!(legacy ? uuid(manifest.projectId) && (manifest.collectionId === void 0 || uuid(manifest.collectionId)) && !("reviewUrl" in manifest) : manifest.schemaVersion === 2 && !("projectId" in manifest) && !("collectionId" in manifest)) || !Array.isArray(manifest.pages) || !Array.isArray(manifest.files) || typeof manifest.collectionName != "string" || !manifest.collectionName.trim() || manifest.collectionName.length > 200) throw new Error("Invalid manifest; regenerate it with the current CLI");
  submittedByLabel(manifest.submittedBy), validateInitialPageOrder(manifest);
  let existing = legacy ? manifest.collectionId : manifest.reviewUrl;
  if ("folderId" in manifest && (legacy || existing)) throw new Error("Folder placement is only supported for a new project; use feedback_update_project to move an existing project");
  if (manifest.folderId !== void 0 && manifest.folderId !== null && !uuid(manifest.folderId)) throw new Error("Invalid folder ID in manifest; select an allowed folder through feedback_list_folders");
  if (("source" in manifest || "private" in manifest) && (legacy || existing)) throw new Error("source and private are only for a new review; a revision keeps its project and visibility");
  if (existing ? !Number.isInteger(manifest.baseRevision) || manifest.baseRevision < 1 : manifest.baseRevision !== void 0) throw new Error("An existing collection requires its published base revision");
  let actual = await inspectFiles(root, manifest.pages.map((page) => page.interactive ? { ...page, include: page.files } : page)), equivalent = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  if (!equivalent(actual.files, manifest.files) || !equivalent(actual.pages, manifest.pages)) throw new Error("Manifest differs from local files or dependencies; regenerate it before preparing another upload");
  if (ticket?.code === "possible_duplicate") throw new Error(`Possible duplicate review; nothing was uploaded. Existing reviews with this name: ${(Array.isArray(ticket.candidates) ? ticket.candidates : []).map((item) => `"${item.name}" ${item.reviewUrl} in ${item.project ? `project ${item.project.path}` : "no project (unassigned)"}, revision ${item.revision}, updated ${item.updatedAt}`).join("; ")}. Ask the user: publish a revision of one of them (map it, then manifest --collection REVIEW_URL), or regenerate this manifest with --new-series if it is a separate series`);
  if (!/^[a-zA-Z0-9_-]+$/.test(ticket.uploadId ?? "") || typeof ticket.uploadToken != "string" || !ticket.uploadToken || /[\r\n]/.test(ticket.uploadToken)) throw new Error("Invalid upload ticket");
  if (!Number.isFinite(Date.parse(ticket.expiresAt))) throw new Error("Upload ticket has an invalid expiry");
  if (legacy && !ticket.reviewUrl) throw new Error(`Legacy upload ticket has no review URL. Call feedback_resume_upload ${JSON.stringify({ uploadId: ticket.uploadId })} through the configured MCP connection as the original actor, then retry with its renewed ticket and the unchanged manifest`);
  if (!finalizeOnly && Date.parse(ticket.expiresAt) <= Date.now()) throw new Error(`Upload ticket expired; resume upload ${ticket.uploadId} through MCP. Use finalize for an uncertain completed upload; never prepare a duplicate collection`);
  let uploadURL = ticketURL(ticket.uploadUrl, `/api/uploads/${ticket.uploadId}/files/`), finalizeURL = ticketURL(ticket.finalizeUrl, `/api/uploads/${ticket.uploadId}/finalize`);
  if (uploadURL.origin !== finalizeURL.origin) throw new Error("Upload and finalize URLs must have the same origin");
  if (!allowedOrigins.includes(finalizeURL.origin)) throw new Error(`Upload ticket targets ${finalizeURL.origin}, which is not an allowed origin (${allowedOrigins.join(", ")}). Nothing was sent. If this Feedback host is intended, it must be listed in feedback.allowedOrigins of the Brixon configuration (${doctorCommand} shows the effective values); do not prepare a duplicate collection`);
  let destination = reviewLink(ticket.reviewUrl);
  if (ticketURL(ticket.reviewUrl, `/collections/${destination.collectionId}`), destination.origin !== finalizeURL.origin || manifest.reviewUrl && !sameReview(manifest.reviewUrl, destination.reviewUrl) || legacy && manifest.collectionId && manifest.collectionId !== destination.collectionId) throw new Error("Upload ticket review URL does not match the manifest or upload origin");
  let mapped = (await readState(stateFile)).collections.find((item) => item.collectionId === destination.collectionId);
  if (existing && mapped && !finalizeOnly && assertPublicationBaseline(mapped, manifest), "baseRevision" in ticket && (ticket.baseRevision ?? null) !== (manifest.baseRevision ?? null)) throw new Error(`Upload ticket was prepared with baseRevision ${ticket.baseRevision ?? "none"}, but this manifest has ${manifest.baseRevision ?? "none"}. Use the manifest sent to feedback_prepare_upload; nothing was sent`);
  if (!Number.isInteger(parallel2) || parallel2 < 1) throw new Error("parallel must be a positive integer");
  let failed, request = async (url, options2, delays = []) => {
    for (let attempt = 0; ; attempt++) {
      let attempts = attempt ? ` after ${attempt + 1} attempts` : "", response2;
      try {
        response2 = await fetchImpl(url, { ...options2, redirect: "error", headers: { Authorization: `Bearer ${ticket.uploadToken}`, ...options2.headers } });
      } catch (error) {
        let failure2 = networkFailure(error), { code } = failure2;
        if (attempt < delays.length && !failed && transientCodes.has(code)) {
          await wait(delays[attempt]);
          continue;
        }
        if (code === "UND_ERR_HEADERS_TIMEOUT") throw new Error(url === finalizeURL ? `Finalize for upload ${ticket.uploadId} did not respond in time (${code}); this is not a connection failure. The revision is not confirmed: call feedback_resume_upload through MCP and check for a result before retrying finalize; do not prepare a duplicate collection` : `File upload for ${ticket.uploadId} did not respond in time (${code}); this is not a connection failure. Resume this upload through MCP and rerun upload with the renewed ticket; do not prepare a duplicate collection`);
        let hint = failureHint(failure2, doctorCommand);
        throw new Error(`Upload connection failed for ${ticket.uploadId}${code ? ` (${code})` : ""}${attempts}. ${hint}Retry finalize after an uncertain completion or resume this upload through MCP; do not prepare a duplicate collection`);
      }
      if (attempt < delays.length && !failed && transientStatuses.has(response2.status)) {
        await response2.body?.cancel().catch(() => {
        }), await wait(delays[attempt]);
        continue;
      }
      if (!response2.ok) throw new Error(`Upload ${ticket.uploadId} failed (HTTP ${response2.status})${attempts}. No local mapping was updated. Retry finalize after an uncertain completion or resume this upload through MCP`);
      return response2;
    }
  }, files = finalizeOnly ? [] : manifest.files, next = 0, sendFiles = async () => {
    for (; !failed && next < files.length; ) {
      let file = files[next++];
      try {
        let bytes = await readSafeFile(root, file.path);
        if (bytes.length !== file.size || sha256(bytes) !== file.sha256) throw new Error(`File changed during upload: ${file.path}`);
        await request(new URL(file.path.split("/").map(encodeURIComponent).join("/"), uploadURL), { method: "PUT", body: bytes, headers: { "Content-Type": file.contentType } }, retryDelays);
      } catch (error) {
        failed ??= { error };
      }
    }
  };
  if (await Promise.all(Array.from({ length: Math.min(parallel2, files.length) }, sendFiles)), failed) throw failed.error;
  let response = await request(finalizeURL, { method: "POST" }), recovery = `The revision may already be published; local mapping was not updated. Call feedback_resume_upload with reviewUrl ${destination.reviewUrl} and uploadId ${ticket.uploadId} through MCP and inspect its result. Verify the original prepared manifest, correct any mismatch (for an existing collection, baseRevision must equal the committed revision minus one), then rerun finalize with the same upload ID and its resumed ticket. Do not prepare a duplicate upload`, mismatch = (detail) => {
    throw new Error(`Finalize response does not match: ${detail}. ${recovery}`);
  }, result;
  try {
    result = await response.json();
  } catch {
    throw new Error(`Finalize returned invalid JSON. ${recovery}`);
  }
  let expectedRevision = (manifest.baseRevision ?? 0) + 1;
  (!result || typeof result != "object" || Array.isArray(result)) && mismatch("expected a publication object"), (!uuid(result.projectId) || legacy && result.projectId !== manifest.projectId || mapped && result.projectId !== mapped.projectId) && mismatch("projectId"), result.collectionId !== destination.collectionId && mismatch("collectionId"), result.reviewUrl !== destination.reviewUrl && mismatch("reviewUrl"), (!Array.isArray(result.pages) || result.pages.length !== manifest.pages.length) && mismatch("pages count"), (result.pages.some((page) => !page || typeof page != "object") || new Set(result.pages.map((page) => page.key)).size !== manifest.pages.length) && mismatch("pages entries or duplicate keys");
  for (let [index, page] of manifest.pages.entries()) {
    let version2 = result.pages.find((item) => item.key === page.key);
    if (version2 || mismatch(`pages[${index}].key`), uuid(version2.versionId) || mismatch(`pages[${index}].versionId`), (!Number.isInteger(version2.number) || version2.number < 1) && mismatch(`pages[${index}].number`), version2.path !== page.path && mismatch(`pages[${index}].path`), equivalent(version2.files, page.files) || mismatch(`pages[${index}].files`), page.kind === "video") {
      let video;
      try {
        video = videoBlock(version2.video, page.key);
      } catch {
        mismatch(`pages[${index}].video`);
      }
      (version2.kind !== "video" || !equivalent(video, page.video)) && mismatch(`pages[${index}].video`);
    }
  }
  result.project !== void 0 && result.project !== null && (!uuid(result.project.id) || typeof result.project.path != "string") && mismatch("project"), result.revision !== expectedRevision && mismatch(`revision: expected ${expectedRevision} from manifest baseRevision, received ${Number.isInteger(result.revision) ? result.revision : "an invalid revision"}`);
  let collection;
  try {
    collection = await recordPublication(stateFile, manifest, result, root);
  } catch (error) {
    throw new Error(`Revision ${result.revision} was published, but saving the local mapping failed: ${error.message}. ${recovery}`);
  }
  return { collectionId: collection.collectionId, projectId: collection.projectId, revision: collection.revision, reviewUrl: collection.reviewUrl, ...result.project === void 0 ? {} : { project: result.project }, ...result.access?.private === void 0 ? {} : { private: result.access.private }, pages: collection.pages.map(({ key, versionId, number, kind, video }) => ({ key, versionId, number, ...kind ? { kind, video } : {} })) };
}

// cli/skills.mjs
async function manageSkills() {
  throw new Error("Skills come with the brixon-ai-client-core plugin; update the plugin through Claude Code or Codex.");
}

// cli/rounds.mjs
function sameViewport(before, after) {
  return before == null || after == null ? before == null && after == null : before.mode === after.mode && before.width === after.width && before.height === after.height;
}
function sameProjectSnapshot(before, after) {
  let versions = (value) => value == null ? null : Object.entries(value).sort(([a], [b]) => a.localeCompare(b));
  return (before.observedContentSequence ?? null) === (after.observedContentSequence ?? null) && JSON.stringify(versions(before.observedVersions)) === JSON.stringify(versions(after.observedVersions));
}
async function sharedSources(collection, comments, root) {
  let sources = comments.map((comment) => {
    let video = comment.annotation?.kind === "video" ? comment.annotation.video : comment.video;
    return { commentId: comment.id, pageKey: comment.pageKey, sourceSha256: video?.scope === "source" ? video.source?.sourceSha256 : void 0 };
  }).filter((item) => item.sourceSha256);
  if (!sources.length) return [];
  let used = /* @__PURE__ */ new Map();
  for (let page of collection.pages)
    if (!(page.kind !== "video" || !page.video.timeline))
      try {
        used.set(page.key, new Set((JSON.parse((await readSafeFile(root, page.video.timeline)).toString("utf8")).segments ?? []).map((segment) => segment?.source?.sourceSha256).filter(Boolean)));
      } catch {
      }
  return sources.map((item) => ({ ...item, pages: [...used].filter(([key, hashes]) => key !== item.pageKey && hashes.has(item.sourceSha256)).map(([key]) => key) }));
}
async function planRound(collection, feedback, selectedIds, root = collection.root, includePages = []) {
  if (!Array.isArray(feedback.comments)) throw new Error("Expected the JSON result of feedback_get_feedback");
  let ids = /* @__PURE__ */ new Set();
  for (let comment of feedback.comments) {
    if (typeof comment.id != "string" || ids.has(comment.id) || comment.collectionId !== collection.collectionId || !Number.isInteger(comment.revision) || !["open", "in_progress", "implemented"].includes(comment.status)) throw new Error("Feedback contains invalid, duplicate, or foreign comments");
    if (comment.pageKey && !collection.pages.some((page) => page.key === comment.pageKey)) throw new Error(`Comment refers to an unmapped page: ${comment.id}`);
    ids.add(comment.id);
  }
  if (selectedIds && (selectedIds.some((id) => !ids.has(id)) || selectedIds.length !== new Set(selectedIds).size)) throw new Error("Selected comment IDs are missing or duplicated");
  let baseline = await checkBaseline(collection, root), candidates = feedback.comments.filter((comment) => !selectedIds || selectedIds.includes(comment.id)), pending = candidates.filter((comment) => comment.status === "open" || comment.status === "in_progress" && Date.parse(comment.claimExpiresAt) <= Date.now()), deferred = pending.filter((comment) => !baseline.ok && (!comment.pageKey || baseline.affectedPages.includes(comment.pageKey))), comments = pending.filter((comment) => !deferred.includes(comment)), sourcePages = await sharedSources(collection, comments, root);
  if (new Set(includePages).size !== includePages.length) throw new Error("--include-page names each page once");
  for (let key of includePages) if (!sourcePages.some((item) => item.pages.includes(key))) throw new Error(`--include-page ${key} does not share the source of a selected comment with scope "source"; its timeline must name the same sourceSha256`);
  return {
    schemaVersion: 1,
    collectionId: collection.collectionId,
    projectId: collection.projectId,
    reviewUrl: reviewLink(collection.reviewUrl).reviewUrl,
    baseRevision: collection.revision,
    root,
    noOp: pending.length === 0,
    ready: baseline.ok && comments.length > 0,
    baseline,
    claimInput: { reviewUrl: reviewLink(collection.reviewUrl).reviewUrl, comments: comments.map(({ id, revision }) => ({ id, revision })) },
    comments,
    ...sourcePages.length ? { sourcePages } : {},
    ...includePages.length ? { includedPages: [...includePages].sort() } : {},
    deferred: deferred.map((comment) => ({ comment, reason: "The local source differs from the published baseline or is missing" })),
    reserved: candidates.filter((comment) => comment.status === "in_progress" && !(Date.parse(comment.claimExpiresAt) <= Date.now())).map(({ id, claimExpiresAt }) => ({ id, claimExpiresAt }))
  };
}
function validateClaim(round, claim) {
  if (!round.ready || round.noOp || !round.baseline?.ok || !round.comments?.length) throw new Error("The round is not ready for a claim");
  if (typeof claim.claimId != "string" || !Number.isFinite(Date.parse(claim.expiresAt)) || Date.parse(claim.expiresAt) <= Date.now()) throw new Error("Feedback claim is missing or expired; fetch feedback again before continuing");
  if (!Array.isArray(claim.comments) || claim.comments.length !== round.comments.length || new Set(claim.comments.map((comment) => comment.id)).size !== round.comments.length || round.comments.some((before) => !claim.comments.some((after) => after.id === before.id && after.collectionId === round.collectionId && after.revision === before.revision + 1 && after.body === before.body && after.versionId === before.versionId && sameViewport(before.viewport, after.viewport) && sameProjectSnapshot(before, after)))) throw new Error("Claim does not match the fixed feedback snapshot; do not edit files");
  return { ok: !0, reviewUrl: reviewLink(round.reviewUrl).reviewUrl, claimId: claim.claimId, expiresAt: claim.expiresAt, commentIds: round.comments.map((comment) => comment.id) };
}
function renewRound(round, feedback, selectedIds) {
  if (round.schemaVersion !== 1 || !round.baseline?.ok || !Array.isArray(round.comments) || !round.comments.length || !Array.isArray(feedback.comments)) throw new Error("Recovery requires the original clean round and fresh feedback");
  let selected = selectedIds ? round.comments.filter((comment) => selectedIds.includes(comment.id)) : round.comments;
  if (selectedIds && (new Set(selectedIds).size !== selectedIds.length || selected.length !== selectedIds.length)) throw new Error("Recovery may only select comments from the original round");
  let comments = [], reserved = [];
  for (let original of selected) {
    let matches = feedback.comments.filter((comment) => comment.id === original.id), fresh = matches[0];
    if (matches.length !== 1 || fresh.collectionId !== round.collectionId) throw new Error(`Recovery feedback is missing or foreign: ${original.id}`);
    if (fresh.status === "implemented") continue;
    for (let key of ["body", "pageKey", "versionId", "annotation"])
      if (JSON.stringify(fresh[key] ?? null) !== JSON.stringify(original[key] ?? null)) throw new Error(`Feedback changed since this round (${original.id}, ${key}); review it before resuming the existing edits`);
    if (!sameProjectSnapshot(original, fresh)) throw new Error(`Feedback changed since this round (${original.id}, project snapshot); review it before resuming the existing edits`);
    if (!sameViewport(original.viewport, fresh.viewport)) throw new Error(`Feedback changed since this round (${original.id}, viewport); review it before resuming the existing edits`);
    let replyFields = ({ id, body, author, createdAt }) => ({ id, body, author, createdAt });
    if (JSON.stringify(fresh.replies?.map(replyFields) ?? null) !== JSON.stringify(original.replies?.map(replyFields) ?? null)) throw new Error(`Feedback changed since this round (${original.id}, replies); review it before resuming the existing edits`);
    if (!Number.isInteger(fresh.revision) || fresh.revision < original.revision) throw new Error("Recovery feedback has an invalid revision");
    if (fresh.status === "open" || fresh.status === "in_progress" && Date.parse(fresh.claimExpiresAt) <= Date.now()) comments.push(fresh);
    else if (fresh.status === "in_progress") reserved.push({ id: fresh.id, claimExpiresAt: fresh.claimExpiresAt });
    else throw new Error("Recovery feedback has an invalid status");
  }
  return { ...round, recovery: !0, noOp: comments.length === 0, ready: comments.length > 0, comments, claimInput: { reviewUrl: reviewLink(round.reviewUrl).reviewUrl, comments: comments.map(({ id, revision }) => ({ id, revision })) }, reserved };
}
function publicationImpact(collection, manifest, round) {
  if (assertPublicationBaseline(collection, manifest), round && (round.schemaVersion !== 1 || round.collectionId !== collection.collectionId || round.projectId !== collection.projectId || !sameReview(round.reviewUrl, collection.reviewUrl) || round.baseRevision !== collection.revision || !Array.isArray(round.comments) || !round.baseline?.ok || !round.ready)) throw new Error("Round is stale, empty, or has unresolved baseline drift");
  let previous = new Map(collection.files.map((file) => [file.path, file.sha256])), current = new Map(manifest.files.map((file) => [file.path, file.sha256])), changed = [...current].filter(([file, hash]) => previous.has(file) && previous.get(file) !== hash).map(([file]) => file), added = [...current.keys()].filter((file) => !previous.has(file)), removed = [...previous.keys()].filter((file) => !current.has(file)), touched = /* @__PURE__ */ new Set([...changed, ...added, ...removed]), affectedPages = manifest.pages.filter((page) => {
    let before = collection.pages.find((old) => old.key === page.key);
    return !before || before.path !== page.path || !!before.interactive != !!page.interactive || JSON.stringify(before.video ?? null) !== JSON.stringify(page.video ?? null) || page.files.some((file) => touched.has(file)) || before.files.some((file) => touched.has(file)) || JSON.stringify([...before.files].sort()) !== JSON.stringify([...page.files].sort());
  }).map((page) => page.key), justified = (key) => (round.sourcePages ?? []).some((item) => item.pages?.includes(key) && round.comments.some((comment) => {
    let video = comment.annotation?.kind === "video" ? comment.annotation.video : comment.video;
    return comment.id === item.commentId && video?.scope === "source" && video.source?.sourceSha256 === item.sourceSha256;
  }));
  if (round?.includedPages !== void 0 && (!Array.isArray(round.includedPages) || round.includedPages.some((key) => !collection.pages.some((page) => page.key === key) || !justified(key)))) throw new Error("Round includes pages that share no source with its comments; plan the round again with --include-page");
  let selectedPages = round ? [.../* @__PURE__ */ new Set([...round.comments.flatMap((comment) => comment.pageKey ? [comment.pageKey] : collection.pages.map((page) => page.key)), ...round.includedPages ?? []])] : [], selectedFiles = new Set(collection.pages.filter((page) => selectedPages.includes(page.key)).flatMap((page) => page.files)), unrelatedFiles = round ? [...changed, ...removed].filter((file) => !selectedFiles.has(file)) : [], unrelatedAdded = round ? added.filter((file) => !manifest.pages.some((page) => selectedPages.includes(page.key) && page.files.includes(file))) : [], addedPages = manifest.pages.filter((page) => !collection.pages.some((old) => old.key === page.key)).map((page) => page.key);
  return { collectionId: collection.collectionId, baseRevision: collection.revision, noOp: affectedPages.length === 0, changed, added, removed, affectedPages, selectedPages, sharedAssetPages: affectedPages.filter((key) => !selectedPages.includes(key)), unrelatedFiles: [...unrelatedFiles, ...unrelatedAdded], addedPages, withinRound: !round || !unrelatedFiles.length && !unrelatedAdded.length && !addedPages.length };
}

// cli/ticket.mjs
async function readTicket(stream = process.stdin) {
  let interactive = !!stream.isTTY;
  interactive && (stream.setRawMode(!0), process.stderr.write(`Ready for upload ticket JSON on hidden stdin; end with Enter.
`));
  let input = "";
  try {
    await new Promise((resolve2, reject) => {
      let finish = (error) => {
        stream.off("data", data), stream.off("end", end), stream.off("error", fail), stream.pause(), error ? reject(error) : resolve2();
      }, data = (chunk) => {
        if (input += chunk.toString("utf8"), input.length > 32768) return finish(new Error("Upload ticket exceeds the input limit"));
        if (interactive && /[\u0003\u0004]/.test(input)) return finish(new Error("Upload ticket input cancelled"));
        interactive && /[\r\n]/.test(input) && finish();
      }, end = () => finish(), fail = () => finish(new Error("Could not read upload ticket from stdin"));
      stream.on("data", data), stream.once("end", end), stream.once("error", fail), stream.resume();
    });
  } finally {
    interactive && stream.setRawMode(!1);
  }
  try {
    return JSON.parse(input);
  } catch {
    throw new Error("Expected prepare-upload ticket JSON on stdin");
  }
}

// cli/source.mjs
import { execFile } from "node:child_process";
import { readFile as readFile4, readdir, realpath as realpath2 } from "node:fs/promises";
import path4 from "node:path";
import { promisify } from "node:util";
var run = promisify(execFile), CAMPAIGN = /^\d{4}-q[1-4]-[a-z0-9-]+$/, NAME = /^[A-Za-z0-9._-]+$/;
async function git(cwd, ...args) {
  try {
    return (await run("git", ["-C", cwd, ...args], { encoding: "utf8" })).stdout.trim() || null;
  } catch {
    return null;
  }
}
function repoFromRemote(remote) {
  let match = remote.trim().replace(/\/+$/, "").replace(/\.git$/, "").match(/([A-Za-z0-9._-]+)[/:]([A-Za-z0-9._-]+)$/);
  return match ? `${match[1]}/${match[2]}` : null;
}
async function campaignFolders(top) {
  let found = /* @__PURE__ */ new Set(), entries = async (dir) => (await readdir(dir, { withFileTypes: !0 }).catch(() => [])).filter((entry) => entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules");
  for (let entry of await entries(top)) {
    CAMPAIGN.test(entry.name.toLowerCase()) && found.add(entry.name.toLowerCase());
    for (let child of await entries(path4.join(top, entry.name))) CAMPAIGN.test(child.name.toLowerCase()) && found.add(child.name.toLowerCase());
  }
  return found;
}
async function detectSource(cwd, root, campaign) {
  let top = await git(cwd, "rev-parse", "--show-toplevel");
  if (!top) {
    if (campaign !== void 0) throw new Error("--campaign requires running the CLI inside the git repository of the campaign");
    return null;
  }
  let remote = await git(cwd, "remote", "get-url", "origin"), repo = remote && repoFromRemote(remote);
  if (!repo) {
    let common = await git(cwd, "rev-parse", "--path-format=absolute", "--git-common-dir"), name = path4.basename(common ? path4.dirname(common) : top);
    repo = NAME.test(name) ? name : null;
  }
  if (!repo) {
    if (campaign !== void 0) throw new Error("--campaign needs a repository the CLI can name: add an origin remote or run it in a checkout whose folder is named after the repository");
    return null;
  }
  let client2 = (await readFile4(path4.join(top, ".brixon.txt"), "utf8").catch(() => "")).match(/^client:[ \t]*([^\r\n]*?)[ \t]*$/m)?.[1], campaigns = await campaignFolders(top), id = campaign?.toLowerCase();
  if (id !== void 0 && (!CAMPAIGN.test(id) || !campaigns.has(id))) throw new Error(`Unknown campaign ${campaign}: use a YYYY-qN-topic folder of this repository (${[...campaigns].sort().join(", ") || "none found"})`);
  if (id === void 0) {
    let [realTop, realRoot] = await Promise.all([realpath2(top), realpath2(path4.resolve(cwd, root)).catch(() => null)]), inside2 = realRoot && path4.relative(realTop, realRoot);
    inside2 && !inside2.startsWith("..") && !path4.isAbsolute(inside2) && (id = inside2.split(path4.sep).map((part) => part.toLowerCase()).find((part) => CAMPAIGN.test(part)));
  }
  return { repo, ...client2 && client2.length <= 80 && !/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/.test(client2) ? { client: client2 } : {}, ...id ? { campaign: id } : {} };
}

// cli/video.mjs
import { execFile as execFile2 } from "node:child_process";
import { createHash as createHash2, randomUUID as randomUUID2 } from "node:crypto";
import { createReadStream } from "node:fs";
import { lstat as lstat3, mkdir as mkdir2, readFile as readFile5, rename as rename2, rm, writeFile as writeFile2 } from "node:fs/promises";
import path5 from "node:path";
import { promisify as promisify2 } from "node:util";
var WORK_DIR = "work/feedback-review", REVIEW_TAG = "brixon-feedback-review/1", execute = promisify2(execFile2), STANDARD_RATES = ["24000/1001", "24/1", "25/1", "30000/1001", "30/1", "50/1", "60000/1001", "60/1"];
async function tool(name, args) {
  try {
    return (await execute(name, args, { maxBuffer: 64 * 1024 * 1024 })).stdout;
  } catch (error) {
    throw error.code === "ENOENT" ? new Error(`${name} is required for video pages but was not found on PATH. Install FFmpeg (macOS: brew install ffmpeg) and retry`) : new Error(`${name} failed: ${String(error.stderr || error.message).trim().split(`
`).slice(-3).join(" ")}`);
  }
}
async function fileHash(file) {
  let hash = createHash2("sha256");
  for await (let chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest("hex");
}
async function writeIfChanged(file, bytes) {
  let current = await readFile5(file).catch(() => null);
  if (current && current.equals(bytes)) return;
  await mkdir2(path5.dirname(file), { recursive: !0 });
  let temporary = `${file}.${randomUUID2()}.tmp`;
  await writeFile2(temporary, bytes), await rename2(temporary, file);
}
var fraction = (value) => {
  let fps = parseFps(value);
  return fps && `${fps.num}/${fps.den}`;
};
async function probeVideo(file) {
  let probe = JSON.parse(await tool("ffprobe", ["-v", "error", "-print_format", "json", "-show_format", "-show_streams", file])), streams = probe.streams ?? [], videos = streams.filter((stream) => stream.codec_type === "video" && !stream.disposition?.attached_pic), audios = streams.filter((stream) => stream.codec_type === "audio"), problems = [], { size } = await lstat3(file);
  if (/\.(?:mp4|m4v)$/i.test(file) ? problems.push(...containerProblems(await mp4Boxes(file), probe.format?.tags?.major_brand)) : problems.push("the file is not an .mp4 or .m4v file"), size > limits.fileBytes && problems.push(`the file has ${Math.ceil(size / 1e6)} MB, more than 100 MB`), videos.length !== 1) return { problems: [...problems, `the file needs exactly one video stream, found ${videos.length}`] };
  let video = videos[0], rotation = Number(video.side_data_list?.find((item) => item.rotation !== void 0)?.rotation ?? video.tags?.rotate ?? 0), quarter = Math.abs(rotation) % 180 === 90, width = quarter ? video.height : video.width, height = quarter ? video.width : video.height, hdr = ["smpte2084", "arib-std-b67"].includes(video.color_transfer) || video.color_primaries === "bt2020" || /^bt2020/.test(video.color_space ?? "");
  video.codec_name !== "h264" ? problems.push(`the video codec is ${video.codec_name}, not H.264`) : ["High", "Main"].includes(video.profile) || problems.push(`the H.264 profile is ${video.profile}, not High or Main`), video.pix_fmt !== "yuv420p" && problems.push(`the pixel format is ${video.pix_fmt}, not 8-bit yuv420p`), hdr ? problems.push("the video is HDR (PQ/HLG or BT.2020), not SDR BT.709") : ["color_primaries", "color_transfer", "color_space"].some((key) => video[key] && !["bt709", "unknown"].includes(video[key])) && problems.push("the colours are not tagged BT.709"), rotation && problems.push("the video carries rotation metadata"), Math.min(width, height) > 1080 && problems.push(`the shorter side has ${Math.min(width, height)} px, more than 1080`), audios.length > 1 ? problems.push(`the file has ${audios.length} audio streams, at most one is allowed`) : audios.length && audios[0].codec_name !== "aac" && problems.push(`the audio codec is ${audios[0].codec_name}, not AAC`);
  let [count, span] = String(video.avg_frame_rate ?? "").split("/").map(Number), rate = parseFps(fraction(video.r_frame_rate)), average = count > 0 && span > 0 ? { value: count / span } : null, durations = (await tool("ffprobe", ["-v", "error", "-select_streams", String(video.index), "-show_entries", "packet=duration", "-of", "csv=p=0", file])).split(`
`).filter(Boolean).slice(0, -1).map(Number), constant = !!rate && !!average && Math.abs(rate.value - average.value) / rate.value < 0.01 && (!durations.length || Math.max(...durations) - Math.min(...durations) <= 1);
  constant || problems.push("the frame rate is variable, not constant");
  let durationSeconds = Math.round(Number(video.duration ?? probe.format?.duration) * 1e3) / 1e3;
  return durationSeconds > 0 || problems.push("the duration is unknown"), {
    problems,
    hdr,
    width,
    height,
    constant,
    stream: video.index,
    tag: probe.format?.tags?.comment,
    // A variable source keeps its base rate when that is a standard rate, else the standard rate nearest its average.
    // The timeline's fps wins when one is supplied.
    fps: constant || STANDARD_RATES.includes(fraction(video.r_frame_rate)) ? fraction(video.r_frame_rate) : average && STANDARD_RATES.reduce((best, item) => Math.abs(parseFps(item).value - average.value) < Math.abs(parseFps(best).value - average.value) ? item : best),
    meta: { durationSeconds, width, height, fps: fraction(video.r_frame_rate), codec: video.codec_name, audio: audios[0]?.codec_name ?? null }
  };
}
async function transcode(source, output, probe, fps, tag) {
  let landscape = probe.width >= probe.height, short = Math.min(720, landscape ? probe.height : probe.width) & -2, filters = [`fps=${fps}`];
  if (probe.hdr) {
    if (!(await tool("ffmpeg", ["-hide_banner", "-filters"])).includes(" zscale ")) throw new Error("This HDR video needs tone mapping, but the installed ffmpeg has no zscale filter (libzimg). Export an SDR BT.709 master or use an ffmpeg build with zscale");
    filters.push("zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv");
  }
  filters.push(`${landscape ? `scale=-2:${short}` : `scale=${short}:-2`}:out_color_matrix=bt709`, "format=yuv420p");
  let temporary = path5.join(path5.dirname(output), `.${path5.basename(output)}.${randomUUID2()}.mp4`), encode = (rate) => tool("ffmpeg", [
    "-nostdin",
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    source,
    "-map",
    `0:${probe.stream}`,
    "-map",
    "0:a:0?",
    "-map_metadata",
    "-1",
    "-map_chapters",
    "-1",
    "-sn",
    "-dn",
    "-vf",
    filters.join(","),
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    ...rate ? ["-b:v", `${rate}`, "-maxrate", `${rate}`, "-bufsize", `${2 * rate}`] : ["-crf", "23"],
    "-profile:v",
    "high",
    "-pix_fmt",
    "yuv420p",
    "-color_primaries",
    "bt709",
    "-color_trc",
    "bt709",
    "-colorspace",
    "bt709",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-movflags",
    "+faststart",
    "-metadata",
    `comment=${tag}`,
    temporary
  ]);
  await mkdir2(path5.dirname(output), { recursive: !0 });
  try {
    if (await encode(), (await lstat3(temporary)).size > limits.fileBytes) {
      let rate = Math.floor(72e7 / probe.meta.durationSeconds) - 128e3;
      if (rate < 2e5) throw new Error("The video is too long for a 100 MB review copy");
      await encode(rate);
    }
    await rename2(temporary, output);
  } finally {
    await rm(temporary, { force: !0 });
  }
}
async function poster(video, output, { durationSeconds, stream }) {
  let temporary = path5.join(path5.dirname(output), `.${path5.basename(output)}.${randomUUID2()}.jpg`);
  await mkdir2(path5.dirname(output), { recursive: !0 });
  try {
    await tool("ffmpeg", ["-nostdin", "-hide_banner", "-loglevel", "error", "-y", "-ss", durationSeconds > 1.5 ? "1" : "0", "-i", video, "-map", `0:${stream}`, "-frames:v", "1", "-q:v", "3", "-map_metadata", "-1", "-f", "image2", "-update", "1", temporary]), await writeIfChanged(output, await readFile5(temporary));
  } finally {
    await rm(temporary, { force: !0 });
  }
}
async function workDirectory(root) {
  let current = path5.resolve(root);
  if ((await lstat3(current)).isSymbolicLink()) throw new Error(`Output root must not be a symlink: ${current}`);
  for (let part of WORK_DIR.split("/")) {
    current = path5.join(current, part);
    let stat = await lstat3(current).catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (!stat) await mkdir2(current);
    else if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error(`${WORK_DIR} must be a real directory inside the output root, not a symlink: ${current}`);
  }
  return current;
}
async function readInput(root, file, label, maxBytes) {
  let absolute = path5.resolve(root, file), stat = await lstat3(absolute).catch(() => null);
  if (!stat?.isFile()) throw new Error(`${label} is not a file: ${file}`);
  if (stat.size > maxBytes) throw new Error(`${label} exceeds ${maxBytes} bytes: ${file}`);
  return readFile5(absolute);
}
function inside(root, absolute) {
  let relative = path5.relative(path5.resolve(root), absolute).split(path5.sep).join("/");
  try {
    return relative.startsWith("../") ? null : safePath(relative);
  } catch {
    return null;
  }
}
async function prepareVideo(root, { key, title, source, timeline, captions }, { reviewCopy = !1 } = {}, warnings = []) {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/.test(key)) throw new Error(`Invalid page key: ${key}`);
  let input = path5.resolve(root, source);
  if (!(await lstat3(input).catch(() => null))?.isFile()) throw new Error(`Video is not a file: ${source}`);
  let agentTimeline;
  if (timeline !== void 0)
    try {
      agentTimeline = JSON.parse((await readInput(root, timeline, "Timeline", TIMELINE_LIMITS.bytes)).toString("utf8"));
    } catch (error) {
      throw new Error(error instanceof SyntaxError ? `Timeline is not valid JSON: ${timeline}` : error.message);
    }
  let checked = await probeVideo(input);
  if (checked.width === void 0 || !(checked.meta.durationSeconds > 0)) throw new Error(`Video ${source} cannot be reviewed: ${checked.problems.join("; ")}`);
  let work = await workDirectory(root), file = input;
  if (checked.problems.length) {
    if (!reviewCopy) throw new Error(`Video ${source} cannot be reviewed as it is: ${checked.problems.join("; ")}. Rerun with --review-copy to write an H.264/AAC MP4 review copy to ${WORK_DIR}/ (the master stays unchanged)`);
    let fps = agentTimeline?.fps ? fraction(agentTimeline.fps) : checked.fps;
    if (!fps) throw new Error(`The frame rate of ${source} is unknown; supply a timeline with its fps`);
    if (!checked.constant && !agentTimeline?.fps && warnings.push(`${source} has a variable frame rate; the review copy uses ${fps}`), file = path5.join(work, `${key}.mp4`), file === input) throw new Error(`The review copy would overwrite its source: ${source}`);
    let tag = `${REVIEW_TAG} source-sha256=${await fileHash(input)} fps=${fps}`, existing = await lstat3(file).then(() => probeVideo(file)).catch(() => null);
    (existing?.tag !== tag || existing.problems.length) && await transcode(input, file, checked, fps, tag);
  } else inside(root, input) || (file = path5.join(work, `${key}${path5.extname(input).toLowerCase()}`), await writeIfChanged(file, await readFile5(input)));
  let final = file === input ? checked : await probeVideo(file);
  if (final.problems.length) throw new Error(`The review copy of ${source} still fails: ${final.problems.join("; ")}`);
  let relative = inside(root, file);
  if (!relative) throw new Error(`Video path cannot be uploaded: ${source}`);
  let reviewSha256 = sha256(await readFile5(file)), video = { poster: `${WORK_DIR}/${key}.jpg` };
  if (await poster(file, path5.join(work, `${key}.jpg`), { durationSeconds: final.meta.durationSeconds, stream: final.stream }), captions !== void 0) {
    let bytes = await readInput(root, captions, "Captions", 1e7);
    if (!/\.vtt$/i.test(captions) || !/^﻿?WEBVTT(?:[ \t]|\r?\n|$)/.test(bytes.toString("utf8"))) throw new Error(`Captions must be a WebVTT .vtt file (convert SRT with: ffmpeg -i captions.srt captions.vtt): ${captions}`);
    video.captions = `${WORK_DIR}/${key}.vtt`, await writeIfChanged(path5.join(work, `${key}.vtt`), bytes);
  }
  if (agentTimeline !== void 0) {
    let copy = agentTimeline && typeof agentTimeline == "object" && !Array.isArray(agentTimeline) ? { ...agentTimeline, source: agentTimeline.source === void 0 ? { reviewSha256 } : agentTimeline.source && typeof agentTimeline.source == "object" && !Array.isArray(agentTimeline.source) ? { ...agentTimeline.source, reviewSha256 } : agentTimeline.source } : agentTimeline, problems = validateTimeline(copy, { durationSeconds: final.meta.durationSeconds, fps: final.meta.fps, reviewSha256 });
    if (problems.length) throw new Error(`Timeline ${timeline} does not fit ${source}: ${problems.join(" ")}`);
    video.timeline = `${WORK_DIR}/${key}.timeline.json`, await writeIfChanged(path5.join(work, `${key}.timeline.json`), Buffer.from(JSON.stringify(copy, null, 2) + `
`));
  }
  return { key, title: title || key, kind: "video", path: relative, video: { ...video, ...final.meta } };
}
async function refreshVideo(root, page) {
  let file = path5.join(path5.resolve(root), ...page.path.split("/")), checked = await probeVideo(file);
  if (checked.problems.length) throw new Error(`Video ${page.path} of page ${page.key} cannot be reviewed: ${checked.problems.join("; ")}. Publish it again with --video ${page.key}=... --review-copy`);
  page.video.poster?.startsWith(`${WORK_DIR}/`) && await poster(file, path5.join(await workDirectory(root), page.video.poster.slice(WORK_DIR.length + 1)), { durationSeconds: checked.meta.durationSeconds, stream: checked.stream });
  let { poster: posterFile, captions, timeline } = page.video;
  return { ...page, video: { ...posterFile ? { poster: posterFile } : {}, ...captions ? { captions } : {}, ...timeline ? { timeline } : {}, ...checked.meta } };
}

// cli/doctor.mjs
import { execFile as execFile3 } from "node:child_process";
import dns from "node:dns/promises";
import http2 from "node:http";
import https2 from "node:https";
import net from "node:net";
import tls2 from "node:tls";
import { promisify as promisify3 } from "node:util";

// cli/put.mjs
import { constants } from "node:fs";
import { lstat as lstat4, open as open2 } from "node:fs/promises";
import https from "node:https";
import path6 from "node:path";
import { Readable, pipeline } from "node:stream";
var defaultOrigins2 = [
  // Cloudflare R2, EU jurisdiction, Brixon account: presigned uploads of Meta Creative and LinkedIn Ads.
  "https://20f261d7a31cca523c1ab1bc4d8e1942.eu.r2.cloudflarestorage.com",
  // Image Generation's upload slots. Meant to move to a Brixon domain before customers use it, so it is
  // not a default in the client edition.
  ...[]
];
function httpsOrigins(value, origin) {
  let origins = originList(value, origin);
  if (origins.some((entry) => !entry.startsWith("https://"))) throw new Error("must contain https origins only");
  return origins;
}
var uploadTool = { name: "upload", keys: { allowedOrigins: { validate: httpsOrigins, default: defaultOrigins2, env: "BRIXON_UPLOAD_ALLOWED_ORIGINS" } } }, types2 = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  mp4: "video/mp4",
  mov: "video/quicktime",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
}, reservedHeaders = /* @__PURE__ */ new Set(["host", "content-length", "transfer-encoding", "connection", "keep-alive", "expect", "upgrade", "te", "trailer", "proxy-authorization", "proxy-connection"]), connectCodes = /* @__PURE__ */ new Set(["ECONNREFUSED", "EAI_AGAIN", "ENETUNREACH", "EHOSTUNREACH"]), rawBodyOnly = "This command sends the file as the raw body of one request; form uploads, several parts and resumable uploads are not supported", wait2 = (milliseconds) => new Promise((resolve2) => setTimeout(resolve2, milliseconds));
function uploadTarget(ticket, allowedOrigins, now = Date.now()) {
  let object = (value) => !!value && typeof value == "object" && !Array.isArray(value);
  if (object(ticket) && typeof ticket.uploadUrl != "string" && object(ticket.ticket) && (ticket = ticket.ticket), !object(ticket) || typeof ticket.uploadUrl != "string")
    throw new Error(Array.isArray(ticket?.slots) ? "This result holds several upload slots; pass one slot or its ticket per call, with the file that belongs to it" : typeof ticket?.upload_url == "string" ? "This is the older result shape (upload_url); pass the ticket object that contains uploadUrl" : "Upload ticket needs an uploadUrl: pass the object that contains uploadUrl; where a tool returns slots, pass one slot or its ticket");
  let url;
  try {
    url = new URL(ticket.uploadUrl);
  } catch {
    throw new Error("Upload ticket contains an invalid uploadUrl");
  }
  if (url.protocol !== "https:" || url.username || url.password || url.hash) throw new Error("Upload ticket uploadUrl must be a plain https address");
  if (!allowedOrigins.includes(url.origin)) throw new Error(`Upload ticket targets ${url.origin}, which is not an allowed origin (${allowedOrigins.join(", ")}). Nothing was sent. If this host is intended, it must be listed in upload.allowedOrigins of the Brixon configuration (${doctorCommand} shows the effective values)`);
  let method = ticket.method ?? "PUT";
  if (method !== "PUT" && method !== "POST") throw new Error(`Upload ticket method must be PUT or POST. ${rawBodyOnly}`);
  if (["fields", "parts", "partNumber", "partUrls", "uploadUrls"].some((field) => ticket[field] != null)) throw new Error(`Upload ticket asks for a form or multi-part upload. ${rawBodyOnly}`);
  let expires;
  if (ticket.expiresAt != null) {
    if (typeof ticket.expiresAt != "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})$/i.test(ticket.expiresAt) || !Number.isFinite(expires = Date.parse(ticket.expiresAt.toUpperCase()))) throw new Error("Upload ticket has an invalid expiresAt; expected a time with its zone such as 2026-11-12T09:30:00Z");
    if (expires <= now) throw new Error(`Upload ticket expired at ${new Date(expires).toISOString()}; nothing was sent. Request a new upload ticket`);
  }
  let headers = {}, contentType = ticket.contentType ?? void 0;
  if (ticket.headers != null) {
    if (typeof ticket.headers != "object" || Array.isArray(ticket.headers) || Object.keys(ticket.headers).length > 20) throw new Error("Upload ticket headers must be an object of up to 20 header names and values");
    let seen = /* @__PURE__ */ new Set();
    for (let [name, value] of Object.entries(ticket.headers)) {
      let lower = name.toLowerCase();
      if (seen.has(lower)) throw new Error(`Upload ticket names the ${reservedHeaders.has(lower) || /^[a-z0-9-]+$/.test(lower) ? lower : "same"} header twice`);
      if (seen.add(lower), !/^[A-Za-z0-9!#$%&'*+.^_`|~-]+$/.test(name) || typeof value != "string" || value.length > 8192 || !/^[\t\x20-\x7e]+$/.test(value)) throw new Error("Upload ticket has a header with an invalid name or value");
      if (reservedHeaders.has(lower)) throw new Error(`Upload ticket must not set the ${lower} header; the command sets it itself`);
      if (lower !== "content-type") headers[name] = value;
      else if (contentType === void 0) contentType = value;
      else if (contentType !== value) throw new Error("Upload ticket names two different content types");
    }
  }
  if (contentType !== void 0 && (typeof contentType != "string" || !/^[\w.+-]+\/[\w.+-]+(?:; ?[\w-]+=(?:[\w.+-]+|"[\w.+ -]*"))*$/.test(contentType))) throw new Error("Upload ticket has an invalid contentType");
  if (/^multipart\//i.test(contentType ?? "")) throw new Error(`Upload ticket asks for a multipart upload. ${rawBodyOnly}`);
  return { url, method, headers, expires, contentType };
}
function serviceMessage({ body = "", type = "" }, target) {
  let text2, storage = !1;
  if (/html/i.test(type) || /<html|<!doctype/i.test(body)) return { storage };
  if (/json/i.test(type) || /^\s*\{/.test(body))
    try {
      let answer = JSON.parse(body);
      text2 = [answer?.error?.message, answer?.error, answer?.message].find((value) => typeof value == "string");
    } catch {
      return { storage };
    }
  else /xml/i.test(type) || /^\s*</.test(body) ? (storage = !0, text2 = body.match(/<Code>([A-Za-z0-9]{1,60})<\/Code>/)?.[1]) : (!type || /^text\/plain/i.test(type)) && !body.includes("�") && (text2 = body);
  let clean = typeof text2 == "string" ? text2.replace(/[^\p{L}\p{N} .,:;'()/_+%!?-]+/gu, " ").replace(/\s+/g, " ").trim() : "", decoded = (value) => {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }, pieces = (values) => values.flatMap((value) => [value, decoded(value)]).flatMap((value) => [value, ...value.split(/[\s,;=/.&?:]+/)]).map((value) => value.toLowerCase()).filter((value) => value.length >= 4), query = target.url.search.slice(1).split("&").map((pair) => pair.split("=")), lower = clean.toLowerCase(), repeats = pieces(query.map(([name]) => name)).some((name) => lower.includes(name)) || pieces([...target.url.pathname.split("/"), ...query.map(([, ...value]) => value.join("=")), ...Object.values(target.headers)]).some((piece) => lower.includes(piece) || piece.length >= 12 && Array.from({ length: piece.length - 7 }, (_, index) => piece.slice(index, index + 8)).some((part) => lower.includes(part)));
  return !clean || repeats || /\/\/|www\./i.test(clean) ? { storage } : { text: clean.slice(0, 200), storage };
}
async function openSource(file) {
  let name = path6.basename(path6.resolve(file)), extension = path6.extname(name).slice(1).toLowerCase();
  if (name.startsWith(".") || /(?:^|[._-])(?:credentials?|secrets?|tokens?|private-key|env)(?:[._-]|$)/i.test(name)) throw new Error(`Refusing to upload a hidden file or a file named like a secret: ${name}`);
  if (!Object.hasOwn(types2, extension)) throw new Error(`Unsupported file type: ${name}. put sends ${Object.keys(types2).join(", ")}`);
  let link = await lstat4(file).catch((error) => {
    throw new Error(`File cannot be read (${error.code}): ${name}`);
  });
  if (link.isSymbolicLink()) throw new Error(`Symlinks are not uploaded: ${name}`);
  if (!link.isFile()) throw new Error(`Not a regular file: ${name}`);
  let handle = await open2(file, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0)).catch((error) => {
    throw new Error(`File cannot be read (${error.code}): ${name}`);
  });
  try {
    let stat = await handle.stat();
    if (!stat.isFile()) throw new Error(`Not a regular file: ${name}`);
    if (!stat.size) throw new Error(`File is empty: ${name}`);
    return { handle, name, size: stat.size, modified: stat.mtimeMs, type: types2[extension] };
  } catch (error) {
    throw await handle.close(), error;
  }
}
function fileBody(source) {
  let position = 0;
  return new Readable({
    highWaterMark: 64 * 1024,
    read() {
      let length = Math.min(this.readableHighWaterMark, source.size - position);
      if (length <= 0) return this.push(null);
      source.handle.read(Buffer.allocUnsafe(length), 0, length, position).then(({ bytesRead, buffer }) => {
        position += bytesRead, this.push(bytesRead ? buffer.subarray(0, bytesRead) : null);
      }, (error) => this.destroy(error));
    }
  });
}
function send(target, source, contentType, idleTimeout, requestOptions, progress) {
  return new Promise((resolve2, reject) => {
    let sent = 0, status, bodySent = !1, settled = !1, refused = !1, watchdog, settle = (finish, value) => {
      settled || (settled = !0, clearTimeout(watchdog), finish(value));
    }, request = https.request(target.url, { ...requestOptions, method: target.method, headers: { ...target.headers, "Content-Length": source.size, "Content-Type": contentType } }), alive = (limit = idleTimeout) => {
      settled || refused || (clearTimeout(watchdog), watchdog = setTimeout(() => {
        let stalled = Object.assign(new Error("No data was exchanged in time"), { code: "ETIMEDOUT" });
        settle(reject, stalled), request.destroy(stalled);
      }, limit));
    };
    alive(), request.on("error", (error) => {
      refused || settle(reject, error);
    }), request.on("response", (response) => {
      if (status = response.statusCode, status < 200 || status >= 300) {
        refused = !0;
        let chunks = [], size = 0, done = () => {
          settle(resolve2, { status, body: Buffer.concat(chunks).toString("utf8"), type: String(response.headers["content-type"] ?? "") }), request.destroy();
        };
        response.on("data", (chunk) => {
          chunks.push(chunk.subarray(0, 4096 - size)), (size += chunk.length) >= 4096 && done();
        });
        for (let event of ["end", "close", "error"]) response.once(event, done);
        clearTimeout(watchdog), watchdog = setTimeout(done, 2e3);
        return;
      }
      response.resume(), bodySent ? settle(resolve2, { status }) : response.once("close", () => {
        sent < source.size && request.destroy(Object.assign(new Error("Answered before the file was sent"), { code: "EARLY_ANSWER" }));
      });
    });
    let stream = fileBody(source);
    stream.on("data", (chunk) => {
      sent += chunk.length, alive();
    }), pipeline(stream, request, (error) => {
      if (!refused) {
        if (error) return settle(reject, error);
        if (sent !== source.size) return request.destroy(Object.assign(new Error("File changed"), { code: "FILE_CHANGED" }));
        bodySent = progress.delivered = !0, alive(idleTimeout * 5), status !== void 0 && settle(resolve2, { status });
      }
    });
  });
}
async function put({ file, ticket, allowedOrigins = defaultOrigins2, retryDelays = [1e3, 3e3, 8e3], idleTimeout = 12e4, requestOptions = {}, now = Date.now }) {
  let target = uploadTarget(ticket, allowedOrigins, now()), source = await openSource(file);
  try {
    let contentType = target.contentType ?? source.type, destination = `Upload of ${source.name} to ${target.url.origin}`, onlyIfAbsent = Object.entries(target.headers).some(([name, value]) => name.toLowerCase() === "if-none-match" && value.trim() === "*"), unanswered = !1, unchanged = async () => {
      let after = await source.handle.stat();
      if (after.size !== source.size || after.mtimeMs !== source.modified) throw new Error(`File changed during upload: ${source.name}. Upload it again`);
    };
    for (let attempt = 0; ; attempt++) {
      let attempts = attempt ? ` after ${attempt + 1} attempts` : "", pause = () => attempt < retryDelays.length && !(target.expires <= now() + retryDelays[attempt]), progress = { delivered: !1 }, answer;
      try {
        answer = await send(target, source, contentType, idleTimeout, requestOptions, progress);
      } catch (error) {
        let failure2 = networkFailure(error);
        if (progress.delivered && (unanswered = !0), failure2.code === "FILE_CHANGED") throw new Error(`File changed during upload: ${source.name}`);
        if (failure2.code === "EARLY_ANSWER") throw new Error(`${destination} failed: the service answered before the whole file was sent. Request a new upload ticket`);
        if ((target.method === "PUT" ? transientCodes : connectCodes).has(failure2.code) && pause()) {
          await wait2(retryDelays[attempt]);
          continue;
        }
        let advice = onlyIfAbsent && unanswered ? "The file may already be stored; this ticket would then be refused. Check with the service before uploading again" : target.method === "PUT" || connectCodes.has(failure2.code) ? "The same upload ticket can be used again until it expires" : "The request may have reached the service; check there before sending the file again";
        throw new Error(`${destination} failed${failure2.code ? ` (${failure2.code})` : ""}${attempts}. ${failureHint(failure2, doctorCommand)}${advice}`);
      }
      let { status } = answer;
      if (target.method === "PUT" && transientStatuses.has(status) && pause()) {
        await wait2(retryDelays[attempt]);
        continue;
      }
      if (status === 412 && onlyIfAbsent) {
        if (unanswered)
          return await unchanged(), { ok: !0, file: source.name, bytes: source.size, method: target.method, status, contentType, origin: target.url.origin, attempts: attempt + 1, inferred: "No answer came back after the whole file had been sent; the next attempt found a file at the address (HTTP 412), which is taken to be this one" };
        throw new Error(`${destination} failed (HTTP 412)${attempts}: the address already holds a file, so this ticket has been used. Request a new upload ticket`);
      }
      if (status < 200 || status >= 300) {
        let said = serviceMessage(answer, target), advice = (said.storage ? /^(?:EntityTooLarge|EntityTooSmall|BadDigest|InvalidDigest)$/.test(said.text ?? "") : [400, 413, 415].includes(status)) ? "The service refused the file or its type; the upload ticket may still be valid for a corrected file" : "Request a new upload ticket if the ticket has expired or was prepared for another file";
        throw new Error(`${destination} failed (HTTP ${status})${attempts}.${status >= 300 && status < 400 ? " Redirects are not followed." : ""} ${advice}${said.text ? `. Answer of the service: "${said.text}"` : ""}`);
      }
      return await unchanged(), { ok: !0, file: source.name, bytes: source.size, method: target.method, status, contentType, origin: target.url.origin, attempts: attempt + 1 };
    }
  } finally {
    await source.handle.close();
  }
}

// cli/doctor.mjs
var execute2 = promisify3(execFile3), TIMEOUT = 1e4, failure = (error) => {
  let { code, proxyStatus } = networkFailure(error);
  return { ok: !1, error: proxyStatus ? `PROXY_HTTP_${proxyStatus}` : String(code ?? error?.name ?? "failed") };
}, timeout = () => Object.assign(new Error("Timed out"), { code: "ETIMEDOUT" });
async function resolve(hostname) {
  let timer;
  try {
    return { ok: !0, addresses: (await Promise.race([dns.lookup(hostname, { all: !0 }), new Promise((_, reject) => {
      timer = setTimeout(() => reject(timeout()), TIMEOUT);
    })])).map((entry) => entry.address) };
  } catch (error) {
    return failure(error);
  } finally {
    clearTimeout(timer);
  }
}
function bypassesProxy(hostname, port, noProxy = "") {
  return noProxy.split(/[,\s]+/).filter(Boolean).some((entry) => {
    if (entry === "*") return !0;
    let [, host, entryPort] = entry.match(/^(.+?)(?::(\d+))?$/), name = host.replace(/^\*?\./, "").toLowerCase();
    return (!entryPort || entryPort === String(port)) && (hostname === name || hostname.endsWith(`.${name}`));
  });
}
function tunnel(proxy, host, port) {
  return new Promise((resolveSocket, reject) => {
    let secure = proxy.protocol === "https:", credentials = proxy.username || proxy.password ? { "Proxy-Authorization": `Basic ${Buffer.from(`${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`).toString("base64")}` } : {}, request = (secure ? https2 : http2).request({ host: proxy.hostname, port: proxy.port || (secure ? 443 : 80), method: "CONNECT", path: `${host}:${port}`, agent: !1, timeout: TIMEOUT, headers: { Host: `${host}:${port}`, ...credentials } });
    request.once("connect", (response, socket) => {
      if (response.statusCode === 200) return resolveSocket(socket);
      socket.destroy(), reject(Object.assign(new Error("Proxy refused the tunnel"), { code: `PROXY_HTTP_${response.statusCode}` }));
    }), request.once("timeout", () => request.destroy(timeout())), request.once("error", reject), request.end();
  });
}
var distinguishedName = (name) => [name?.O, name?.CN].flat().filter(Boolean).join(" / ") || void 0;
async function certificate(host, port, proxy, ca) {
  try {
    let socket = proxy ? await tunnel(proxy, host, port) : void 0;
    return await new Promise((resolveResult, reject) => {
      let secure = tls2.connect({ ...socket ? { socket } : { host, port }, servername: net.isIP(host) ? void 0 : host, rejectUnauthorized: !1, ...ca ? { ca } : {} });
      secure.setTimeout(TIMEOUT, () => secure.destroy(timeout())), secure.once("error", reject), secure.once("secureConnect", () => {
        let peer = secure.getPeerCertificate(!0), top = peer;
        for (; top.issuerCertificate && top.issuerCertificate !== top; ) top = top.issuerCertificate;
        resolveResult({
          ok: secure.authorized,
          via: proxy ? "proxy" : "direct",
          protocol: secure.getProtocol(),
          subject: distinguishedName(peer.subject),
          issuer: distinguishedName(peer.issuer),
          validTo: peer.valid_to,
          chainEndsAt: distinguishedName(top.subject),
          ...secure.authorized ? {} : { error: String(secure.authorizationError) }
        }), secure.destroy();
      });
    });
  } catch (error) {
    return { ...failure(error), via: proxy ? "proxy" : "direct" };
  }
}
async function inspectedCertificate(host, port, proxy) {
  let result = await certificate(host, port, proxy);
  if (!result.subject) return result;
  let publicChain = (await certificate(host, port, proxy, tls2.getCACertificates("bundled"))).ok;
  return { ...result, publicChain, tlsInspection: publicChain ? "not detected" : "likely: the public Node.js root certificates alone do not accept this chain" };
}
async function uploadEndpoint(origin) {
  try {
    let response = await fetch(`${origin}/api/uploads/00000000-0000-4000-8000-000000000000/finalize`, { method: "POST", redirect: "manual", signal: AbortSignal.timeout(TIMEOUT) }), reached = response.status === 401 && (await response.json().catch(() => null))?.error === "Upload grant is missing.";
    return { ok: reached, status: response.status, ...reached ? {} : { note: "Expected HTTP 401 from the Feedback upload endpoint; a different answer usually comes from a proxy, gateway or sign-in page in between" } };
  } catch (error) {
    return failure(error);
  }
}
async function tool2(name) {
  try {
    return { found: !0, version: (await execute2(name, ["-version"], { timeout: TIMEOUT })).stdout.split(`
`)[0].trim().slice(0, 200) };
  } catch (error) {
    return { found: !1, ...error.code === "ENOENT" ? {} : { error: String(error.code ?? "failed") } };
  }
}
async function doctor({ flags = {}, env = process.env, version: version2, paths } = {}) {
  let report = { ok: !1, ...{ cli: `${program} ${version2}`, edition }, node: { version: process.versions.node, required: nodeRequirement, ok: nodeSupported(), platform: process.platform, arch: process.arch } }, ffmpeg = async () => ({}), config;
  try {
    config = await loadConfig({ tools: [feedbackTool, uploadTool], flags, env, ...paths ? { paths } : {} });
  } catch (error) {
    return { ...report, config: { error: error.message }, ...await ffmpeg() };
  }
  let shown = (keys, prefix = "") => Object.fromEntries(keys.map((key) => [key, prefix + key]).filter(([, key]) => config.settings[key] !== void 0).map(([name, key]) => [name, { value: key === "proxy.url" ? redactProxy(config.settings[key]) : config.settings[key], source: config.sources[key] }]));
  if (report.config = { files: config.files, shared: shown(NETWORK_KEYS), feedback: shown(Object.keys(feedbackTool.keys), `${feedbackTool.name}.`), upload: shown(Object.keys(uploadTool.keys), `${uploadTool.name}.`), ignored: config.ignored }, !report.node.ok) return { ...report, network: { skipped: "This Node.js version cannot apply the proxy and certificate settings" }, ...await ffmpeg() };
  let applied;
  try {
    applied = applyNetwork(config, { env });
  } catch (error) {
    return { ...report, network: { error: error.message }, ...await ffmpeg() };
  }
  let { trust, proxy } = applied, unverified = env.NODE_TLS_REJECT_UNAUTHORIZED === "0";
  report.certificates = { mode: config.settings["ca.mode"], ...config.settings["ca.mode"] === "file" ? { file: config.settings["ca.file"] } : {}, trusted: trust.certificates.length, nodeExtraCaCerts: trust.extra, ...unverified ? { verification: "disabled by NODE_TLS_REJECT_UNAUTHORIZED=0; remove this variable" } : {} }, report.proxy = { mode: proxy.mode, ...proxy.https ? { url: redactProxy(proxy.https), source: proxy.source } : {}, ...proxy.noProxy === void 0 ? {} : { noProxy: proxy.noProxy } };
  let connection = async (origin) => {
    let url = new URL(origin), secure = url.protocol === "https:", host = url.hostname.replace(/^\[|\]$/g, ""), port = Number(url.port || (secure ? 443 : 80)), address = secure ? proxy.https : proxy.http, via = address && !bypassesProxy(url.hostname, port, proxy.noProxy) ? new URL(address) : null;
    return {
      origin,
      dns: { ...await resolve(host), ...via ? { note: "With a proxy, local name resolution of the target is not required" } : {} },
      proxy: via ? { used: !0, dns: await resolve(via.hostname) } : { used: !1 },
      ...secure ? { tls: await inspectedCertificate(host, port, via) } : {}
    };
  };
  report.origins = await Promise.all(config.settings["feedback.allowedOrigins"].map(async (origin) => ({ ...await connection(origin), uploadEndpoint: await uploadEndpoint(origin) })));
  let targets = await Promise.all(config.settings["upload.allowedOrigins"].map(connection));
  return report.upload = { ok: targets.every((item) => item.tls?.ok !== !1), note: "Targets of the put command; needed only where a Brixon tool uploads files with it", origins: targets }, Object.assign(report, await ffmpeg()), report.ok = !unverified && report.upload.ok && report.origins.every((item) => item.uploadEndpoint.ok && item.tls?.ok !== !1), report;
}

// cli/index.mjs
var { version } = JSON.parse(await readFile6(new URL("../feedback/package.json", import.meta.url), "utf8")), help = `brixon-feedback ${version}

inspect --root DIR --page KEY=PATH [--page KEY=PATH ...] [--video KEY=PATH ...] [--title KEY=TITLE] [--interactive KEY] [--include KEY=PATH] [--submitted-by NAME_OR_EMAIL]
        [--review-copy] [--timeline KEY=FILE] [--captions KEY=FILE.vtt]
manifest --root DIR --name NAME --page KEY=PATH [...] [--video KEY=PATH ...] [--review-copy] [--timeline KEY=FILE] [--captions KEY=FILE.vtt] [--interactive KEY] [--include KEY=PATH] [--campaign YYYY-qN-TOPIC] [--private] [--folder PROJECT_ID | --no-folder] [--new-series] [--submitted-by NAME_OR_EMAIL] [--page-order KEY,KEY,...]
manifest [--collection ID|NAME|REVIEW_URL] [--root DIR] [--base-revision N]
target [--collection ID|NAME|REVIEW_URL]
map --collection REVIEW_URL --snapshot FILE --root DIR
state
check-baseline [--collection ID|NAME|REVIEW_URL] [--root DIR]
round --feedback FILE [--collection ID|NAME|REVIEW_URL] [--comment ID ...] [--include-page KEY ...]
renew-round --round FILE --feedback FILE [--comment ID ...]
check-claim --round FILE --claim FILE
impact --manifest FILE [--round FILE]
upload --manifest FILE [--root DIR] [--round FILE --claim FILE] [--proxy URL] [--no-proxy HOSTS] [--ca-file PEM]
finalize --manifest FILE [--root DIR] [--proxy URL] [--no-proxy HOSTS] [--ca-file PEM]
doctor [--proxy URL] [--no-proxy HOSTS] [--ca-file PEM]
put --file PATH [--proxy URL] [--no-proxy HOSTS] [--ca-file PEM]
skills install|check [--target both|codex|claude] [--scope project|user] [--directory DIR]

All commands return JSON. --state FILE overrides the workspace .brixon-feedback.json.
manifest writes JSON to stdout; save it outside the selected output directory.
A review is one collection with one review URL; a project is a folder that groups reviews.
Run manifest inside the repository the work belongs to. A new review carries its source: the repository (owner/name
from the origin remote, or the checkout folder name without one) and, if the repository declares one in a .brixon.txt
file, a client name. From that source the service places the review in a project automatically and decides whether
everyone signed in to the workspace sees it or it stays private; without a repository it can recognise, the review
gets no project and is private. The answer to feedback_prepare_upload names the project and the access; use --private
whenever a review must stay private.
--campaign names an existing campaign folder of the repository (YYYY-qN-topic, for example 2026-q3-launch, at the top
or one level below), so an automatically placed review goes under that campaign; if --root lies inside a campaign
folder, it is detected.
--private makes the review private (owner, explicit shares and administrators only).
--folder PROJECT_ID overrides the placement only when the person names a project; --no-folder publishes without one.
Its manifest carries a new requestId, so resending it after an uncertain answer is safe.
--new-series confirms a separate review after a possible_duplicate answer; never add it silently.
Existing reviews retain their project; use feedback_update_project with its metadata revision to rename or move one.
--submitted-by records informational uploader attribution, never access rights or authenticated identity.
Successor manifests reuse the saved label unless explicitly overridden.
Review discovery (feedback_list_projects), projects (feedback_list_folders) and agent identity (feedback_whoami) use MCP.
An existing collection retains its pages and uses its last published local revision.
--interactive KEY runs that page's own scripts for reviewers in an isolated frame (scripts only from its files and
cdn.jsdelivr.net, cdnjs.cloudflare.com, unpkg.com; analytics is removed). --include KEY=PATH adds a file the page loads
with fetch(), such as data.json, to an interactive page. Without --page a revision keeps both from the saved mapping.
--video KEY=PATH publishes a video page (MP4 path relative to --root or absolute). ffprobe/ffmpeg must be installed.
A file that passes the checks (H.264 High/Main yuv420p, SDR BT.709, constant frame rate, AAC or no audio, MP4 with
moov before mdat, at most 100 MB, shorter side at most 1080 px) is uploaded unchanged; otherwise --review-copy
transcodes it into ${WORK_DIR}/KEY.mp4 (720 px shorter side, CRF 23, AAC 128k, +faststart), the master stays unchanged.
Every video page gets a poster ${WORK_DIR}/KEY.jpg. --timeline KEY=FILE validates a brixon-feedback-timeline/1 file
and uploads a copy with source.reviewSha256 set to the uploaded video; --captions KEY=FILE.vtt adds WebVTT captions.
Without --page and --video a revision keeps the saved video pages and refreshes their poster and ffprobe facts.
round --include-page KEY lets an apply round also change a sibling video that shares the source of a selected
comment with scope "source" (proven by both pages' timelines).
--page-order lists every selected page key once, in review order, for a new collection only.
Existing collections retain their saved order; use feedback_set_page_order to change it.
check-baseline exits 2 on changed/missing files; skills check exits 2 when outdated.
No command performs permanent authentication or saves an upload token.
upload and finalize read the short-lived upload ticket JSON from stdin.
finalize recovers an uncertain completion without uploading files again.
An apply round uses --round FILE on manifest, impact, and upload; upload also requires --claim FILE.
Network: upload and finalize trust the operating system certificate store in addition to the Node.js roots and use the
proxy from HTTPS_PROXY/NO_PROXY. They send only to allowed origins (default https://feedback.brixon.ai), up to four files
in parallel, and repeat a file transfer after a transient network error. The settings come from the Brixon
configuration shared by all Brixon command-line tools (config.json: ca and proxy at the top level, this tool's keys
under "feedback"). In order of precedence: the managed file (written by IT; its keys are locked),
--proxy/--no-proxy/--ca-file, BRIXON_PROXY, BRIXON_NO_PROXY, BRIXON_CA_FILE and BRIXON_FEEDBACK_ALLOWED_ORIGINS,
then the user file. Proxy credentials are accepted only from the environment.
doctor reports the Node.js version, the effective settings with their origin, name resolution, proxy, the server
certificate issuer, the upload endpoint, the targets of put and FFmpeg as JSON without secrets; it exits 2 on a problem.
put sends one local file to an upload URL that a Brixon MCP server prepared (for example a presigned storage URL).
It reads the ticket JSON from hidden stdin: uploadUrl (required), expiresAt, contentType, method (PUT by default, or
POST) and headers (optional); other fields are ignored. Pass the object that contains uploadUrl; where a tool
returns several slots, pass one slot or its ticket per call. The file (jpg, jpeg, png, gif, webp, mp4, mov, pdf, doc,
docx, ppt, pptx) is streamed with its exact length as the raw body of one request; form and multi-part uploads are
refused. A PUT is repeated after a transient network error. The target must be https and listed in
upload.allowedOrigins (BRIXON_UPLOAD_ALLOWED_ORIGINS); an expired ticket is refused. When the service refuses the
file, the error repeats its answer as far as that is safe. The upload URL and the ticket headers are credentials
and never appear in output.
Result: {ok, file, bytes, method, status, contentType, origin, attempts}; "inferred" is added when a retry found the
file already stored (HTTP 412 for a ticket with If-None-Match: *) after an earlier attempt had sent it completely.
Node.js 24.14 or newer is required. Details are in the administration guide for the Node operating mode.
`;
function options(args) {
  let result = {};
  for (let index = 0; index < args.length; index++) {
    let key = args[index];
    if (["--no-folder", "--new-series", "--private", "--review-copy"].includes(key)) {
      if (result[key.slice(2)]) throw new Error(`Repeated option: ${key}`);
      result[key.slice(2)] = !0;
      continue;
    }
    if (!key.startsWith("--") || args[index + 1] === void 0 || args[index + 1].startsWith("--")) throw new Error(`Expected --option VALUE, got ${key.split("=")[0]}`);
    let name = key.slice(2);
    if (!["root", "page", "title", "name", "collection", "base-revision", "state", "manifest", "target", "scope", "directory", "feedback", "round", "claim", "comment", "snapshot", "folder", "submitted-by", "page-order", "campaign", "interactive", "include", "video", "timeline", "captions", "include-page", "file", ...networkFlags].includes(name)) throw new Error(`Unknown option: ${key}`);
    let value = args[++index];
    if (["page", "title", "comment", "interactive", "include", "video", "timeline", "captions", "include-page"].includes(name)) (result[name] ??= []).push(value);
    else {
      if (result[name] !== void 0) throw new Error(`Repeated option: ${key}`);
      result[name] = value;
    }
  }
  return result;
}
function keyValues(values = []) {
  return values.map((value) => {
    let split = value.indexOf("=");
    if (split < 1 || split === value.length - 1) throw new Error(`Expected KEY=VALUE: ${value}`);
    return [value.slice(0, split), value.slice(split + 1)];
  });
}
async function videosFromOptions(root, opts, warnings) {
  let titles = Object.fromEntries(keyValues(opts.title)), videos = keyValues(opts.video), extra = (name) => {
    let pairs = keyValues(opts[name]);
    for (let [key] of pairs) if (pairs.filter(([other]) => other === key).length > 1 || !videos.some(([video]) => video === key)) throw new Error(`--${name} names each selected --video key once: ${key}`);
    return Object.fromEntries(pairs);
  }, keys = [...videos.map(([key]) => key), ...keyValues(opts.page).map(([key]) => key)];
  if (new Set(keys).size !== keys.length) throw new Error(`Duplicate page key in ${"--page"}: ${keys.find((key, index) => keys.indexOf(key) !== index)}`);
  let timelines = extra("timeline"), captions = extra("captions"), pages = [];
  for (let [key, source] of videos) pages.push(await prepareVideo(root, { key, title: titles[key], source, timeline: timelines[key], captions: captions[key] }, { reviewCopy: !!opts["review-copy"] }, warnings));
  return pages;
}
function pagesFromOptions(opts) {
  let titles = Object.fromEntries(keyValues(opts.title)), interactive = new Set(opts.interactive || []), include = keyValues(opts.include), pages = keyValues(opts.page).map(([key, file]) => ({ key, path: file, title: titles[key] || key, ...interactive.has(key) ? { interactive: !0 } : {}, ...include.some(([page]) => page === key) ? { include: include.filter(([page]) => page === key).map(([, file2]) => file2) } : {} }));
  for (let key of [...interactive, ...include.map(([key2]) => key2)]) if (!pages.some((page) => page.key === key)) throw new Error(`--interactive and --include name a selected page key: ${key}`);
  return pages;
}
async function readRound(filename, stateFile) {
  let round = JSON.parse(await readFile6(filename, "utf8")), mapped = (await readState(stateFile)).collections.find((item) => item.collectionId === round.collectionId);
  if (round.reviewUrl === void 0) {
    if (round.schemaVersion !== 1 || !mapped || mapped.projectId !== round.projectId || round.claimInput?.collectionId !== round.collectionId || !Array.isArray(round.claimInput.comments)) throw new Error("Legacy round requires its exact saved collection and project mapping");
    let reviewUrl = reviewLink(mapped.reviewUrl).reviewUrl;
    return { ...round, reviewUrl, claimInput: { reviewUrl, comments: round.claimInput.comments } };
  }
  let target = reviewLink(round.reviewUrl);
  if (target.collectionId !== round.collectionId || reviewLink(round.claimInput?.reviewUrl).reviewUrl !== target.reviewUrl || mapped && (mapped.projectId !== round.projectId || !sameReview(mapped.reviewUrl, target.reviewUrl))) throw new Error("Round review URL does not match its saved collection and project mapping");
  return round;
}
async function main() {
  let [command, ...args] = process.argv.slice(2);
  if (!command || command === "--help" || command === "help") return process.stdout.write(clientHelp(version));
  if (command === "--version") return process.stdout.write(`${program} ${version}
`);
  command !== "doctor" && requireNode(program, doctorCommand);
  let skillAction = command === "skills" ? args.shift() : null, opts = options(args);
  if (!0) {
    for (let flag of videoOptions) if (opts[flag] !== void 0) throw new Error(`--${flag} is not available: ${noVideo}`);
  }
  if (command === "skills") throw new Error("Skills come with the Brixon plugin; this edition of the Brixon CLI does not install them");
  let withoutVideo = (pages) => {
    if (Array.isArray(pages) && pages.some((page) => page?.kind === "video" || page?.versions?.some?.((item) => item?.kind === "video"))) throw new Error(`This review contains video pages; ${noVideo}`);
  };
  if (opts["page-order"] !== void 0 && command !== "manifest") throw new Error("--page-order is supported only by manifest for a new collection");
  if (opts["submitted-by"] !== void 0 && !["inspect", "manifest"].includes(command)) throw new Error("--submitted-by is supported only by inspect and manifest");
  for (let flag of ["video", "review-copy", "timeline", "captions"]) if (opts[flag] !== void 0 && !["inspect", "manifest"].includes(command)) throw new Error(`--${flag} is supported only by inspect and manifest`);
  if (!opts.video && (opts["review-copy"] || opts.timeline || opts.captions)) throw new Error("--review-copy, --timeline and --captions require the video pages with --video KEY=PATH");
  if (opts["include-page"] !== void 0 && command !== "round") throw new Error("--include-page is supported only by round");
  for (let flag of ["folder", "no-folder", "new-series", "campaign", "private"]) if (opts[flag] !== void 0 && command !== "manifest") throw new Error(`--${flag} is supported only by manifest for a new review`);
  if (opts.folder !== void 0 && opts["no-folder"]) throw new Error("Choose either --folder PROJECT_ID or --no-folder");
  for (let flag of networkFlags) if (opts[flag] !== void 0 && !["upload", "finalize", "doctor", "put"].includes(command)) throw new Error(`--${flag} is supported only by upload, finalize, put and doctor`);
  if (opts.file !== void 0 && command !== "put") throw new Error("--file is supported only by put");
  if (opts.folder !== void 0 && !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(opts.folder)) throw new Error("--folder requires an existing folder ID from feedback_list_folders");
  let localState = path7.resolve(opts.state || statePath(process.cwd())), result;
  if (command === "skills") {
    if (!["install", "check"].includes(skillAction)) throw new Error("Use skills install or skills check");
    result = await manageSkills({ action: skillAction, ...opts }), result.ok || (process.exitCode = 2);
  } else if (command === "put") {
    if (!opts.file) throw new Error("Supply --file PATH");
    let config = await loadConfig({ tools: [uploadTool], flags: opts });
    applyNetwork(config);
    try {
      result = await put({ file: opts.file, ticket: await readTicket(), allowedOrigins: config.settings["upload.allowedOrigins"] });
    } finally {
      setTimeout(() => process.exit(), 2e3).unref();
    }
  } else if (command === "doctor")
    result = await doctor({ flags: opts, version }), result.ok || (process.exitCode = 2);
  else if (command === "state") result = await readState(localState);
  else if (command === "target") result = selectCollection(await readState(localState), opts.collection);
  else if (command === "map") {
    if (!opts.collection || !opts.snapshot || !opts.root) throw new Error("Supply --collection REVIEW_URL, --snapshot FILE from get_collection, and --root DIR");
    let snapshot = JSON.parse(await readFile6(opts.snapshot, "utf8"));
    withoutVideo(snapshot?.pages), result = await mapCollection(localState, opts.collection, snapshot, opts.root);
  } else if (command === "round") {
    if (!opts.feedback) throw new Error("Supply --feedback FILE containing the MCP feedback result");
    let collection = selectCollection(await readState(localState), opts.collection);
    withoutVideo(collection.pages), result = await planRound(collection, JSON.parse(await readFile6(opts.feedback, "utf8")), opts.comment, opts.root ? path7.resolve(opts.root) : void 0, opts["include-page"]), !result.noOp && !result.ready && (process.exitCode = 2);
  } else if (command === "check-claim") {
    if (!opts.round || !opts.claim) throw new Error("Supply --round FILE and --claim FILE");
    result = validateClaim(await readRound(opts.round, localState), JSON.parse(await readFile6(opts.claim, "utf8")));
  } else if (command === "renew-round") {
    if (!opts.round || !opts.feedback) throw new Error("Supply the original --round FILE and fresh --feedback FILE");
    result = renewRound(await readRound(opts.round, localState), JSON.parse(await readFile6(opts.feedback, "utf8")), opts.comment);
  } else if (command === "impact") {
    if (!opts.manifest) throw new Error("Supply --manifest FILE");
    let manifest = JSON.parse(await readFile6(opts.manifest, "utf8")), round = opts.round ? await readRound(opts.round, localState) : void 0;
    result = publicationImpact(selectCollection(await readState(localState), manifest.schemaVersion === 1 ? manifest.collectionId : manifest.reviewUrl), manifest, round), result.withinRound || (process.exitCode = 2);
  } else if (command === "check-baseline")
    result = await checkBaseline(selectCollection(await readState(localState), opts.collection), opts.root), result.ok || (process.exitCode = 2);
  else if (command === "inspect" || command === "manifest") {
    let previous;
    if (command === "manifest" && (opts.collection || !opts.page && !opts.video)) {
      let state = await readState(localState);
      previous = selectCollection(state, opts.collection);
    }
    if (previous && (opts.folder !== void 0 || opts["no-folder"])) throw new Error("Move an existing review through feedback_update_project with its current metadata revision; --folder and --no-folder are only for new reviews");
    if (previous && (opts.campaign !== void 0 || opts.private)) throw new Error("--campaign and --private are only for a new review; a revision keeps its project and visibility");
    if (previous && opts["new-series"]) throw new Error("--new-series is only for a new review; a revision keeps its review URL");
    if (previous && opts["page-order"] !== void 0) throw new Error("--page-order is only supported for a new collection; use feedback_set_page_order for an existing collection");
    withoutVideo(previous?.pages);
    let root = opts.root || previous?.root;
    if (!root) throw new Error("Supply --root with the explicitly selected output directory");
    if (!opts.page && (opts.interactive || opts.include)) throw new Error("--interactive and --include require the pages with --page KEY=PATH");
    let warnings = [], pages;
    if (opts.page || opts.video) pages = [...opts.page ? pagesFromOptions(opts) : [], ...await videosFromOptions(root, opts, warnings)];
    else if (previous) {
      pages = [];
      for (let page of previous.pages) pages.push(page.kind === "video" ? await refreshVideo(root, page) : page.interactive ? { ...page, include: page.files.filter((file) => file !== page.path) } : page);
    }
    if (!pages?.length) throw new Error("Select pages explicitly with --page KEY=PATH");
    if (previous && previous.pages.some((page) => !pages.some((next) => next.key === page.key))) throw new Error("Publication must retain every existing page key");
    let submittedBy = submittedByLabel(opts["submitted-by"] ?? previous?.submittedBy), inspected = { ...await inspectFiles(root, pages, warnings), ...submittedBy === void 0 ? {} : { submittedBy } };
    if (command === "inspect") result = { ...inspected, warnings };
    else {
      let collectionName = opts.name || previous?.collectionName;
      if (!collectionName?.trim() || collectionName.length > 200) throw new Error("A collection requires --name with 1–200 characters");
      let placement = previous ? {} : { source: await detectSource(process.cwd(), root, opts.campaign), ...opts.folder !== void 0 ? { folderId: opts.folder.toLowerCase() } : opts["no-folder"] ? { folderId: null } : {}, ...opts.private ? { private: !0 } : {} };
      if (result = { schemaVersion: 2, collectionName, ...inspected, ...previous ? {} : { ...placement, requestId: randomUUID3(), ...opts["new-series"] ? { newSeries: !0 } : {} } }, opts["page-order"] !== void 0 && (result.pageOrder = opts["page-order"].split(",").map((key) => key.trim())), validateInitialPageOrder(result), previous) {
        let revision = opts["base-revision"] === void 0 ? previous.revision : Number(opts["base-revision"]);
        if (!Number.isInteger(revision) || revision < 1 || revision !== previous.revision) throw new Error("Base revision must match the saved source mapping");
        result.reviewUrl = reviewLink(previous.reviewUrl).reviewUrl, result.baseRevision = revision;
      } else if (opts["base-revision"]) throw new Error("--base-revision requires a mapped existing collection");
      for (let warning of warnings) process.stderr.write(JSON.stringify({ warning }) + `
`);
      if (opts.round) {
        if (!previous) throw new Error("A feedback round requires an existing mapped collection");
        let impact = publicationImpact(previous, result, await readRound(opts.round, localState));
        if (!impact.withinRound) throw new Error(`Changes outside the feedback round: ${[...impact.unrelatedFiles, ...impact.addedPages].join(", ")}`);
        if (impact.noOp) throw new Error("No changed page content; do not publish this feedback round");
      }
    }
  } else if (command === "upload" || command === "finalize") {
    if (!opts.manifest) throw new Error("Supply --manifest FILE");
    let manifest = JSON.parse(await readFile6(opts.manifest, "utf8"));
    withoutVideo(manifest?.pages);
    let state = await readState(localState), selector = manifest.schemaVersion === 1 ? manifest.collectionId : manifest.reviewUrl, mapped = selector ? state.collections.find((item) => matchesCollection(item, selector)) : null, root = opts.root || mapped?.root;
    if (!root) throw new Error("Supply --root DIR for this new collection");
    if (opts.round) {
      if (!opts.claim || !mapped) throw new Error("A feedback upload requires its mapped collection and --claim FILE");
      let round = await readRound(opts.round, localState);
      validateClaim(round, JSON.parse(await readFile6(opts.claim, "utf8")));
      let impact = publicationImpact(mapped, manifest, round);
      if (!impact.withinRound || impact.noOp) throw new Error("Upload has no changes or contains changes outside the feedback round");
    }
    let config = await loadConfig({ tools: [feedbackTool], flags: opts });
    applyNetwork(config);
    let ticket = await readTicket();
    result = await upload({ manifest, ticket, root, stateFile: localState, finalizeOnly: command === "finalize", allowedOrigins: config.settings["feedback.allowedOrigins"], parallel: config.settings["feedback.uploads.parallel"] });
  } else throw new Error(`Unknown command: ${command}; use --help`);
  process.stdout.write(JSON.stringify(result, null, 2) + `
`);
}
main().catch((error) => {
  process.stderr.write(JSON.stringify({ error: error.message }) + `
`), process.exitCode = 1;
});
